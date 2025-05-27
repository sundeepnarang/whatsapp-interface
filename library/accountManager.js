const FromAccount = require( "./models/FromAccount" );
const FromAccounts = require( "./models/FromAccounts" );
const {fromAccounts=[]} = require("./config");


async function init() {
    const availableFromAccounts = new FromAccounts();
    for (const account of fromAccounts) {
        const { name, token, phoneNumberId, templates} = account;
        await availableFromAccounts.addAccount(name, new FromAccount(token, phoneNumberId, templates));
    }
    return availableFromAccounts;
}

const availableFromAccounts = init()

async function updateToken(accountName, accessToken) {
    const account = await availableFromAccounts.getAccount(accountName)
    account.accessToken = accessToken
    await availableFromAccounts.updateAccount(accountName, account)
}

async function addTemplate(accountName, template) {
    const account = await availableFromAccounts.getAccount(accountName)
    account.addTemplate(template)
    await availableFromAccounts.updateAccount(accountName, account)
}

exports.availableFromAccounts = availableFromAccounts;
exports.addTemplate = addTemplate;
exports.updateToken = updateToken;