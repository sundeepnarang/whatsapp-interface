import crypto from "crypto";

import {tokens} from "./config.js";

const {key,gToken} = tokens;

const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;
const BUFFER_SIZE = 32;
const RANDOM_MAX = 1000;
const outputEncoding = 'hex';
const inputEncoding = 'base64';
const timeOffsetAllowed = 10*60*60*1000; // 10 mins to milliseconds

function decryptData(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), outputEncoding);
    let encryptedText = Buffer.from(textParts.join(':'), outputEncoding);
    let keyBuffer = Buffer.concat([Buffer.from(key, inputEncoding), Buffer.alloc(BUFFER_SIZE)], BUFFER_SIZE)
    let decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function encryptData(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let keyBuffer = Buffer.concat([Buffer.from(key, inputEncoding), Buffer.alloc(BUFFER_SIZE)], BUFFER_SIZE)
    let cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString(outputEncoding) + ':' + encrypted.toString(outputEncoding);
}


export function authReq(req, res, next){
    const {token: tokenHeader} = req.body;
    try {
        const {reqTime, reqRand, token} = JSON.parse(decryptData(tokenHeader));
        if(gToken!==token){
            console.log("Admin auth failed : ",tokenHeader);
            return res.sendStatus(404);
        }
        const currentTime = Date.now();
        if(Math.abs(currentTime - reqTime) > timeOffsetAllowed){
            console.log("Timestamp too off for aut: ",reqTime);
            return res.sendStatus(404);
        }
        if(reqRand > RANDOM_MAX) {
            console.log("Weird rand received for auth : ",reqRand);
            return res.sendStatus(404);
        }
        next();
    }catch(err){
        console.log("Error authentication request: ", err);
        return res.sendStatus(404);
    }
}

export function createAuthToken() {
    return encryptData(JSON.stringify({
        reqTime: new Date().getTime(),
        reqRand: Math.round(Math.random()*RANDOM_MAX).toString(),
        token
    }));
}