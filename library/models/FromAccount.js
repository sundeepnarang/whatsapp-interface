class FromAccount {
    constructor(token="", phoneNumberId="", templates=[]) {
        this.token = token;
        this.phoneNumberId = phoneNumberId;
        this.templates = templates;
    }

    hasTemplate(template){
        return this.templates.indexOf(template) > -1;
    }

    addTemplate(template){
        if(!this.hasTemplate(template)){
            this.templates.push(template);
        }
    }
}

module.exports = FromAccount;