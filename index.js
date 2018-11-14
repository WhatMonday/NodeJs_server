const express = require('express');
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
    var input = event.message.text;
    var str = input.split(',');
    var command = str[0];
    var pin = str[1];
      client.replyMessage(event.replyToken, {
        type: 'text',
        text:  input
      });
    }else{
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Unknow command'
      });
}
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

//netpie microgear
var MicroGear = require('microgear');
const APPID = 'PocketBot';
const KEY = 'E8d0mBCaYxpb6FW';
const SECRET = 'XxnxMl4kZ51vWCli1rQpEtib7';
var microgear = MicroGear.create({ key : KEY, secret : SECRET });
microgear.on('connected', function() { console.log('Connected...');
microgear.setAlias("nodejs");
setInterval(function() { microgear.chat('mygear', 'Hello world.'); },1000); });
microgear.on('message', function(topic,body) { console.log('incoming : '+topic+' : '+body); });
microgear.on('closed', function() { console.log('Closed...'); });
microgear.connect(APPID);
