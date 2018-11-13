const express = require('express')
const middleware = require('@line/bot-sdk').middleware

const app = express()

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}

app.post('/webhook', middleware(config), (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
