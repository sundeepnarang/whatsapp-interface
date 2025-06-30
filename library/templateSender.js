import {sendTemplateMessage} from "./whatsappApi.js"
import {sqlProcessor} from "./sqlProcessor.js"

const dryRUnApi = true;

function templateVarsToComponents(templateName, templateVars){
    switch(templateName) {
        case "event_details_reminder_test":
            const {className, instructorName, classDate, classTime, classAddress, insertId} = templateVars;
            return [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": className
                        },
                        {
                            "type": "text",
                            "text": instructorName
                        },
                        {
                            "type": "text",
                            "text": classDate
                        },
                        {
                            "type": "text",
                            "text": classTime
                        },
                        {
                            "type": "text",
                            "text": classAddress
                        }
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "url",
                    "index": "0",
                    "parameters": [
                        {
                            "type": "payload",
                            "payload": insertId
                        }
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "url",
                    "index": "1",
                    "parameters": [
                        {
                            "type": "payload",
                            "payload": insertId
                        }
                    ]
                }
            ]
    }
}

export function sendTemplate ({fromAccountName, templateName,language,recipient,templateVars}) {
    return new Promise(async (resolve, reject) => {
        const {token, phoneNumberId} = await sqlProcessor.getApplication(fromAccountName);
        const uniqueRecordId = await sqlProcessor.storeRequest({
            fromApplicationName:fromAccountName,
            templateName,
            recipientNumber:recipient,
            templateVars
        });
        templateVars.insertId = uniqueRecordId
        const components = templateVarsToComponents(templateVars);
        console.log("Template Vars: ",JSON.stringify(templateVars,null, 2));
        if(dryRUnApi){
            return resolve({result:{dryRUnApi}, uniqueRecordId});
        }
        sendTemplateMessage({token, phoneNumberId, templateName, language, recipient, components})
            .then((response) => response.text())
            .then((result) => {
                console.log("API Result:", result)
                resolve({result, uniqueRecordId})
            })
            .catch((error) => {
                console.error("API Error: ", error)
                reject(error)
            });
    });
}



