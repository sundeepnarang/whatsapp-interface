class FromAccount {
    constructor(token="", phoneNumberId="", templates=[]) {
        this.token = token;
        this.phoneNumberId = phoneNumberId;
        this.templates = templates;
    }

    hasTemplate(template){
        return this.templates.indexOf(template) > -1;
    }
}

module.exports = FromAccount;