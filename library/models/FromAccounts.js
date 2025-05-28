import {FromAccount} from  "./FromAccount.js" ;

export class FromAccounts {
    constructor (){
        this.accounts = {}
    }

    async addAccount(name="", account=new FromAccount()){
        this.accounts[name] = account;
    }

    async getAccount(name){
        if(this.accounts.hasOwnProperty(name)){
            return this.accounts[name];
        }
        throw new Error(`Could not find a account with name '${name}'`);
    }

    async updateAccount(accountName, value){
        if(this.accounts.hasOwnProperty(name)){
            return this.accounts[name] = value;
        }
        throw new Error(`Could not find a account with name '${name}'`);
    }
}
