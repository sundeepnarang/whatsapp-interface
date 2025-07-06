import sql from "mssql"
import {sqlConnectConfig} from "./config.js";

const sqlPool = new sql.ConnectionPool(sqlConnectConfig)


function SQLProcessor () {
    this.webhooksTable = "[DNN].[dbo].[SOS_WhatsappWebhookRequests]";
    this.notificationsTable = "[DNN].[dbo].[SOS_WhatsappNotificationRequests]";
    this.applicationsTable = "[DNN].[dbo].[SOS_Whatsapp_Application_Creds]";

    this.runQueryPromise = async function (query) {
        console.log("Running Query: ", query);
        const pool = await sqlPool.connect()
        return  new sql.Request(pool).query(query);
    };
}

SQLProcessor.prototype.getApplicationFromName = async function (applicationName) {
    const selectQuery =
        `SELECT [Token], [PhoneNumber] FROM ${this.applicationsTable} WHERE AppName='${applicationName}'`;
    const appsResultWrapper = await this.runQueryPromise(selectQuery);
    const apps = appsResultWrapper.recordset;
    console.info("Fetched " + apps.length + " application to process!\n\r");
    if (apps.length>0) {
        const application = apps[0]
        if(apps.length>1){
            console.error("Multiple Application not found with same name");
        }
        return {token: application.Token, phoneNumberId: application.PhoneNumber}
    }
    throw new Error(`Application not found with name "${applicationName}"!`);
}

SQLProcessor.prototype.getApplicationFromPhone = async function (phoneNumber) {
    const selectQuery =
        `SELECT [AppName] FROM ${this.applicationsTable} WHERE PhoneNumber='${phoneNumber}'`;
    const appsResultWrapper = await this.runQueryPromise(selectQuery);
    const apps = appsResultWrapper.recordset;
    console.info("Fetched " + apps.length + " application to process!\n\r");
    if (apps.length>0) {
        const application = apps[0]
        if(apps.length>1){
            console.error("Multiple Application not found with same name");
        }
        return application.AppName
    }
    throw new Error(`Application not found with name "${phoneNumber}"!`);
}

SQLProcessor.prototype.storeRequest = async function ({fromApplicationName, recipientNumber, templateName, templateVars}){
    const now = new Date().getTime();
    const insertQuery =
        `INSERT INTO ${this.notificationsTable} (
        [FromApplicationName],[RecipientNumber],[TemplateName],[TemplateVars]
        ) VALUES ('${fromApplicationName}', '${recipientNumber}', '${templateName}',
                  '${JSON.stringify(templateVars).replace(/\'/g,"\\'" )}');
        Select SCOPE_IDENTITY()  as LastRequestId`;
    const storeResultWrapper = await this.runQueryPromise(insertQuery);
    const storeResult = storeResultWrapper.recordset;
    if(storeResult.length!==1) {
        console.log("Insert error storeResultWrapper: ", storeResultWrapper);
        throw new Error(`Insert error!`);
    }
    console.info("Inserted " + storeResult[0].LastRequestId + " to process!\n\r");
    return storeResult[0].LastRequestId;
}

SQLProcessor.prototype.storeHookMessage = async function(body){
    const {object="", entry:entries=[]} = body;
    if(object==="whatsapp_business_account"){
        for(const entry of entries){
            const {id:entryId, changes=[]} = entry;
            for(const change  of changes){
                const {value:{metadata:{displayPhoneNumber="", phoneNumberId=""}={}}={}, statuses, messages, contacts, field} = change;
                const appName = await this.getApplicationFromPhone(phoneNumberId)
                if(messages.length>0){
                    for(const message of messages){
                        const {from="", text="", type=""} = message;
                        const insertQuery =
                            `INSERT INTO ${this.webhooksTable}
                            (FromApplicationName, SenderWAId, MessageType, MessageText, APIResponse)
                            VALUES('${appName}', '${from}', '${type}', '${JSON.stringify(text).replace(/\'/g,"\\'" )}', '${JSON.stringify(body).replace(/\'/g,"\\'" )}');`;
                        const storeResultWrapper = await this.runQueryPromise(insertQuery);
                    }
                }else {
                    const insertQuery =
                        `INSERT INTO ${this.webhooksTable}
                            (FromApplicationName, SenderWAId, MessageType, MessageText, APIResponse)
                            VALUES('${appName}', '', 'STATUS', '', '${JSON.stringify(body).replace(/\'/g,"\\'" )}');`;
                    const storeResultWrapper = await this.runQueryPromise(insertQuery);
                }
            }
        }
    }
    console.log(`Not a valid hook message: [${JSON.stringify(body)}]`);
}

export const sqlProcessor = new SQLProcessor();