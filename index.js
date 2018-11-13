const express = require('express')
const app = express();
const line = require('@line/bot-sdk');
const Client = require('@line/bot-sdk').Client;
const client = new Client({
  channelAccessToken: 'dzaOAQEbS4W3KQFaoq2IbC8Z6rxrvk46MkI6tgcmhFRy9amJTG48myOZdg8OuKsex4aKxDgevUajHk9PgtXLR1GTjlFav5brcEKP8bV/o+YqkSeVylPHY+UtfzzNrZO4OT6ZGZSfa3cFvpNMosmuRQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
});
const event = req.body.events[0];
if (event.type === 'message' && event.message.type === 'text') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text:  event.message.text
      });
}else{
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Unknow command'
      });
}
//const middleware = require('@line/bot-sdk').middleware
/*const config = {
  channelAccessToken: 'dzaOAQEbS4W3KQFaoq2IbC8Z6rxrvk46MkI6tgcmhFRy9amJTG48myOZdg8OuKsex4aKxDgevUajHk9PgtXLR1GTjlFav5brcEKP8bV/o+YqkSeVylPHY+UtfzzNrZO4OT6ZGZSfa3cFvpNMosmuRQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}
app.post('/webhook', line.middleware(config), (req, res) => {
 Promise
        .all(req.body.events.map(handleEvent))
        .catch((e) => {
            console.log(e)
        })
    //return res.json({ status: 'ok' })
});
function handleEvent(event) {
  var echo;
  if (event.type === 'message' || event.message.type === 'text') {
    echo = { 
        type: 'text', 
        text: 'Unknow input'
    };
  }else{
  var  echo = { 
        type: 'text', 
        text: event.message.text 
    };
  }
return client.replyMessage(event.replyToken, echo); 

}*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
