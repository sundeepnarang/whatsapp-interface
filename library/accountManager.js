import {FromAccount} from  "./models/FromAccount.js" ;
import {FromAccounts} from  "./models/FromAccounts.js" ;

import {fromAccounts} from "./config.js";


async function init() {
    const availableFromAccounts = new FromAccounts();
    for (const account of fromAccounts) {
        const { name, token, phoneNumberId, templates} = account;
        await availableFromAccounts.addAccount(name, new FromAccount(token, phoneNumberId, templates));
    }
    return availableFromAccounts;
}

export const availableFromAccounts = await init()

export async function updateToken(accountName, accessToken) {
    const account = await availableFromAccounts.getAccount(accountName)
    account.accessToken = accessToken
    await availableFromAccounts.updateAccount(accountName, account)
}

export async function addTemplate(accountName, template) {
    const account = await availableFromAccounts.getAccount(accountName)
    account.addTemplate(template)
    await availableFromAccounts.updateAccount(accountName, account)
}
