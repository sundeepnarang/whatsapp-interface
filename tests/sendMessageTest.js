import "dotenv/config"
import {sendTemplateMessage} from "../library/whatsappApi.js"

const recipient= process.env.RECIPIENT
const token = process.env.TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;

sendTemplateMessage({token, phoneNumberId, recipient})
    .then((response) => response.text())
    .then((result) => {
        console.log("Result:", result)
    })
    .catch((error) => console.error(error));