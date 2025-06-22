import express from 'express';

import {sendTemplate} from "../library/templateSender.js";
import {updateToken, addTemplate} from "../library/accountManager.js";

export const router = express.Router();

router.get('/health', (req, res) => {
  res.sendStatus(200)
})

router.post('/sendMessage', async function(req, res, next) {
  const {fromAccountName, templateName,recipient,templateVars,language} = req.body;
  try {
    const apiRes = await sendTemplate ({fromAccountName, templateName,language,recipient,templateVars})
    console.log(`apiRes: ${JSON.stringify(apiRes, null, 2)}`);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Errored: ",err);
    return res.sendStatus(500);
  }
});

router.post("/updateToken", async function(req, res, next) {
  const {accName, accessToken} = req.body;
  await updateToken(accName, accessToken)
  res.sendStatus(200);
})


router.post("/addTemplate", async function(req, res, next) {
  const {accName, template} = req.body;
  await addTemplate(accName, template)
  res.sendStatus(200);
})

router.all('/whatsappWebhook', async function(req, res){
  console.log("============================================");
  console.log("Whatsapp Webhook");
  console.log(`Query: ${JSON.stringify(req.query, null, 2)}`);
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
  const {"hub.challenge":challenge} = req.query;
  console.log(`Hub challenge: ${challenge}`);
  if (challenge) {
    console.log(`Sending challenge: ${challenge}`);
    return res.send(challenge);
  }
  else {
    return res.sendStatus(200);
  }
  console.log("============================================");
});