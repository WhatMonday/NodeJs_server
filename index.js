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
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        //handleMessageEvent(event);
        let triggerMsg = event.message.text.toUpperCase()
        if (triggerMsg === 'CHECK,0') {
            var msg = {
                type: 'text',
                text: 'Hello World'
            };

            return client.replyMessage(event.replyToken, msg);
        }
        //return Promise.resolve('ok');
    } else {
        return Promise.resolve(null);
    }
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
