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
    var message = event.replyToken+','+event.message.text;
    var request = require("request");
    var options = { method: 'PUT',
          url: 'https://api.netpie.io/microgear/PocketBot/node-red',
          qs: { retain: '', auth: 'E8d0mBCaYxpb6FW:XxnxMl4kZ51vWCli1rQpEtib7' },
          body: message };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
        console.log(message);
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
