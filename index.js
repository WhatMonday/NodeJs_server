const express = require('express')
const middleware = require('@line/bot-sdk').middleware

const app = express()

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}

app.post('/webhook', middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'Hello World'
    };

    return client.replyMessage(event.replyToken, msg);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
