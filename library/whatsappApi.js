async function sendTemplateMessage({
   token,
   phoneNumberId,
   templateName="hello_world",
   language= {
        "code": "en_US"
    },
   recipient
}) {
    console.log(`Sending template message with name '${templateName}'`);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": recipient,
        "type": "template",
        "template": {
            "name": templateName,
            "language": language
        }
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, requestOptions);
}

module.exports = {sendTemplateMessage};



