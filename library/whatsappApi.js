export async function sendTemplateMessage({
   token,
   phoneNumberId,
   templateName="hello_world",
   language= {
        "code": "en_US"
    },
    components=[],
   recipient
}) {
    console.log(`Sending template message with name '${templateName}'`);
    console.log(`Components added '${components}'`);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const template = {
        "name": templateName,
        "language": language,
    }

    if(components && components.length) {
        template.components = components;
    }

    const raw = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient,
        "type": "template",
        template
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, requestOptions);
}
