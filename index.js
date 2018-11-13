const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();
const app = express();

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const client = new line.Client(config);
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
      .all(req.body.events.map(handleEvent))
      .catch((e) => {
          console.log(e)
      })
  return res.json({status: 'ok'})
}

// File:handler/index.js
// Main logic to process event based on trigger message
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve('ok');
  }

/*function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    return client.replyMessage(event.replyToken, msg);
    
}*/

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
