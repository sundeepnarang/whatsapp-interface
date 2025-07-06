import express from 'express';

import {sendTemplate} from "../library/templateSender.js";
import {updateToken} from "../library/accountManager.js";
import {authReq} from "../library/encryptDecryptToken.js";
import {sqlProcessor} from "../library/sqlProcessor.js"

export const router = express.Router();

router.get('/health', (req, res) => {
  res.sendStatus(200)
})

router.post('/sendMessage', authReq, async function(req, res, next) {
  const {fromAccountName, templateName,recipient,templateVars,language} = req.body;
  try {
    const sendResult = await sendTemplate ({fromAccountName, templateName,language,recipient,templateVars})
    const {result: apiRes, uniqueRecordId} = sendResult
    console.log(`sendResult: ${JSON.stringify(sendResult, null, 2)}`);
    return res.send({uniqueRecordId});
  } catch (err) {
    console.error("Errored: ",err);
    return res.sendStatus(500);
  }
});

router.post("/updateToken",authReq, async function(req, res, next) {
  const {accName, accessToken} = req.body;
  await updateToken(accName, accessToken)
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
    res.sendStatus(200);
    await sqlProcessor.storeHookMessage(req.body)
  }
  console.log("============================================");
});