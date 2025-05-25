const FromAccount = require( "./models/FromAccount" );
const FromAccounts = require( "./models/FromAccounts" );
const {fromAccounts=[]} = require("./config");

function initAccounts() {
    const availableFromAccounts = new FromAccounts();
    fromAccounts.forEach( (account) => {
        const { name, token, phoneNumberId, templates} = account;
        availableFromAccounts.addAccount(name, new FromAccount(token, phoneNumberId, templates));
    })
    return availableFromAccounts;
}

exports.availableFromAccounts = initAccounts();