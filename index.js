const express = require('express')
const line = require('@line/bot-sdk');
//const middleware = require('@line/bot-sdk').middleware
//const app = express()

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}
/*
app.post('/webhook', middleware(config), (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})
*/
// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
