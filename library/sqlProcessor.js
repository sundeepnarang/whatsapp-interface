import sql from "mssql"

const sqlPool = new sql.ConnectionPool({
    user: '',
    password: '',
    server: '',
    database: 'DNN'
})


function SQLProcessor () {
    this.webhooksTable = "[DNN].[dbo].[SOS_WhatsappWebhookRequests]";
    this.notificationsTable = "[DNN].[dbo].[SOS_WhatsappNotificationRequests]";
    this.applicationsTable = "[DNN].[dbo].[SOS_WHATSAPP_APPLICATION_CREDS]";

    this.runQuery = function (query,done) {return new sql.Request(query,done)};
    this.runQueryPromise = function (query) {return new sql.Request(query)};
}

SQLProcessor.prototype.getApplication = async function (applicationName) {
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

SQLProcessor.prototype.storeRequest = async function ({fromApplicationName, recipientNumber, templateName, templateVars}){
    const now = new Date().getTime();
    const insertQuery =
        `INSERT INTO ${this.notificationsTable} (
                          [FromApplicationName],[RecepientNumber],[TemplateName],[TemplateVars]
                          [CreatedOn],[SendBy],[SentOn],[UpdatedOn]
        ) VALUES (${fromApplicationName}, ${recipientNumber}, ${templateName}, ${JSON.stringify(templateVars)}, 
                  ${now}, ${now}, ${now}, ${now});
        Select SCOPE_IDENTITY()  as LastRequestId`;
    const storeResultWrapper = await this.runQueryPromise(insertQuery);
    const storeResult = storeResultWrapper.LastRequestId;
    console.info("Inserted " + storeResult.LastRequestId + " to process!\n\r");
    return storeResultWrapper.LastRequestId;
}

export const sqlProcessor = new SQLProcessor();