const FromAccount = require( "./FromAccount" );

class FromAccounts {
 constructor (){
     this.accounts = {}
 }

 addAccount(name="", account=new FromAccounts()){
     this.accounts[name] = account;
 }

 getAccount(name){
     if(this.accounts.hasOwnProperty(name)){
         return this.accounts[name];
     }
     throw new Error(`Could not find a account with name '${name}'`);
 }
}

module.exports = FromAccounts;