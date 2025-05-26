const {sendTemplateMessage} = require("./whatsappApi.js")
const {availableFromAccounts} = require("./initAccounts")

async function sendTemplate({fromAccountName, templateName,recipient,components}) {
    const fromAccount = availableFromAccounts.getAccount(fromAccountName);
    const {token, phoneNumberId} = fromAccount;
    if (fromAccount.hasTemplate(templateName)) {
        return await sendTemplateMessage({token, phoneNumberId, templateName,recipient,components});
    }
    throw new Error(`Could not find template with name '${templateName}' in account [${fromAccountName}]`);
}

exports.sendTemplate = sendTemplate;