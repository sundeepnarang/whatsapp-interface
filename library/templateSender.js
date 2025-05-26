const {sendTemplateMessage} = require("./whatsappApi.js")
const {availableFromAccounts} = require("./initAccounts")

function sendTemplate({fromAccountName, templateName,recipient,components}) {
    return new Promise((resolve, reject)=> {
        const fromAccount = availableFromAccounts.getAccount(fromAccountName);
        const {token, phoneNumberId} = fromAccount;
        if (fromAccount.hasTemplate(templateName)) {
            sendTemplateMessage({token, phoneNumberId, templateName, recipient, components})
                .then((response) => response.text())
                .then((result) => {
                    console.log("API Result:", result)
                    resolve(result)
                })
                .catch((error) => {
                    console.error("API Error: ",error)
                    reject(error)
                });
        } else {
            reject(new Error(`Could not find template with name '${templateName}' in account [${fromAccountName}]`));
        }
    });
}

exports.sendTemplate = sendTemplate;