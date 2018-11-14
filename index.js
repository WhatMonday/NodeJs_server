const express = require('express');
const fs = require('fs');
const app = express();
const line = require('@line/bot-sdk');
const Client = require('@line/bot-sdk').Client;
const config = {
  channelAccessToken: 'dzaOAQEbS4W3KQFaoq2IbC8Z6rxrvk46MkI6tgcmhFRy9amJTG48myOZdg8OuKsex4aKxDgevUajHk9PgtXLR1GTjlFav5brcEKP8bV/o+YqkSeVylPHY+UtfzzNrZO4OT6ZGZSfa3cFvpNMosmuRQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}
const client = new Client(config);
app.post('/webhook', line.middleware(config), (req, res) => {
const event = req.body.events[0];
  if (event.type === 'message' && event.message.type === 'text') {
    var message = event.source.userId +','+ event.message.text;
        microgear.chat('node1', message);
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
//netpie microgear=========================================================================================
var MicroGear = require('microgear');
const APPID = 'PocketBot';
const KEY = 'E8d0mBCaYxpb6FW';
const SECRET = 'XxnxMl4kZ51vWCli1rQpEtib7';
const ALIAS = 'nodejs';
var microgear = MicroGear.create({ key : KEY, secret : SECRET, alias : ALIAS });
microgear.connect(APPID);
microgear.on('connected', function() { console.log('Connected to NETPIE');});
// message handler
microgear.on('message', function(topic,body) {
  /*console.log('incoming : '+topic+' : '+body);
  const equipment = ["D0","D1","D2","D3","D4","D5","D6","D7","D8"];
  var str = body.split(",");
  var user = str[0];
    console.log(user);
  var pin = parseInt(str[1], 10);
    console.log(pin.toString());
  var state = str[2];
    console.log(state);
  var cmd = str[3];
    console.log(cmd);
  var msg = "";
  var action = "";
    if (cmd === 'check'){
      if (state === 'on'){
        msg = equipment[pin] + " ถูกเปิดอยู่";
        action = "off";
      }else if (state === 'off'){
        msg = equipment[pin] + " ถูกปิดอยู่";
        action = "on";
      }
      //create rich menu for user
    }else{
      if (cmd ==='on'){
        msg = equipment[pin] +" ถูกเปิดแล้ว";
      }else if(cmd === 'off'){
        msg = equipment[pin] +" ถูกปิดแล้ว";
      }else{
        msg = "unknow command";
      }
    }*/
    client.pushMessage('U7918f36feb5c4b9e4530b3d5ba88e274', { type: 'text',text: 'Hello'})
});
