const express = require('express');
const fs = require('fs');
const app = express();
const line = require('@line/bot-sdk');
const Client = require('@line/bot-sdk').Client;
const unirest = require("unirest");
const config = {
  channelAccessToken: 'dzaOAQEbS4W3KQFaoq2IbC8Z6rxrvk46MkI6tgcmhFRy9amJTG48myOZdg8OuKsex4aKxDgevUajHk9PgtXLR1GTjlFav5brcEKP8bV/o+YqkSeVylPHY+UtfzzNrZO4OT6ZGZSfa3cFvpNMosmuRQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}
const client = new Client(config);
app.post('/webhook', line.middleware(config), (req, res) => {
const event = req.body.events[0];
  if (event.type === 'message' && event.message.type === 'text') {
    var message = event.source.userId +','+ event.message.text;
    var ALIAS = "node1";
    var APPID = "Pocketbot/";
    var KEY = "E8d0mBCaYxpb6FW";
    var SECRET = "XxnxMl4kZ51vWCli1rQpEtib7";
    var req = unirest("PUT", "https://api.netpie.io/microgear/" + APPID + ALIAS);
    req.query({"auth": KEY + ":" + SECRET});
    req.send(message);
    req.end(function (res) {if (res.error) throw new Error(res.error);console.log(res.body);});
        console.log(message);
    }else{
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Unknow command'
      });
}
return res.json({status: 'ok'})
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
