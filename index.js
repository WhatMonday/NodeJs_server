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
    var APPID = "PocketBot/";
    var KEY = "E8d0mBCaYxpb6FW";
    var SECRET = "XxnxMl4kZ51vWCli1rQpEtib7";
    var req = unirest("PUT", "https://api.netpie.io/microgear/" + APPID + ALIAS);
    req.query({"retain": "","auth": KEY + ":" + SECRET});
    req.send(message);
    req.end(function (res) {console.log(res.body);});
    console.log(message);
    }else{
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Unknow command'
      });
}
return res.json({status: 'ok'})
});
app.post('/reply', function(req, res){
var TOKEN = req.query.token;
var COMMAND = req.query.command;
var PIN = req.query.pin;
var STATE = req.query.state;
var equipment = ['D0','D1','D2','D3','D4','D5','D6','D7'];
var msg = '';
var action = '';
  if (cmd === 'check'){
    if (state === 'on'){
      msg = equipment[pin] + ' ถูกเปิดอยู่';
      action = 'off';
    }else if (state === 'off'){
      msg = equipment[pin] + ' ถูกปิดอยู่';
      action = 'on';
    }
    //create rich menu for user
  }else{
    if (cmd ==='on'){
      msg = equipment[pin] +' ถูกเปิดแล้ว';
    }else if(cmd === 'off'){
      msg = equipment[pin] +' ถูกปิดแล้ว';
    }else{
      msg = "unknow command";
    }
  }
  client.pushMessage('U7918f36feb5c4b9e4530b3d5ba88e274', { type: 'text',text: 'Hello'})
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
