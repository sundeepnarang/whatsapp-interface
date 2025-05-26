var express = require('express');
const {sendTemplate} = require("../library/templateSender");
const {token} = require("morgan");
var router = express.Router();

router.post('/sendMessage', async function(req, res, next) {
  const {fromAccountName, templateName,recipient} = req.body;
  try {
    const apiRes = await sendTemplate({fromAccountName, templateName, recipient})
    console.log(`apiRes: ${JSON.stringify(apiRes, null, 2)}`);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Errored: ",err);
    return res.sendStatus(500);
  }
});

router.all('/whatsappWebhook', async function(req, res){
  console.log("============================================");
  console.log("Whatsapp Webhook");
  console.log(`Query: ${JSON.stringify(req.query, null, 2)}`);
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
  const {"hub.challenge":challenge} = req.query;
  console.log(`Hub challenge: ${challenge}`);
  console.log(`Sending challenge: ${challenge}`);
  console.log("============================================");
  return res.send(challenge);
});

module.exports = router;
