var express = require('express');
const {sendTemplate} = require("../library/templateSender");
var router = express.Router();

router.post('/sendMessage', async function(req, res, next) {
  const {fromAccountName, templateName,recipient} = req.body;
  const apiRes = await sendTemplate({fromAccountName, templateName,recipient})
  console.log(`apiRes: ${JSON.stringify(apiRes, null, 2)}`);
  return res.sendStatus(200);
});

router.all('/whatsappWebhook', async function(req, res){
  console.log("============================================");
  console.log("Whatsapp Webhook");
  console.log(`Query: ${JSON.stringify(req.query, null, 2)}`);
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
  console.log("============================================");
  return res.sendStatus(200);
});

module.exports = router;
