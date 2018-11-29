const express = require('express');
const app = express();
const fs = require('fs');
const line = require('@line/bot-sdk');
const Client = require('@line/bot-sdk').Client;
const config = {
  channelAccessToken: 'dzaOAQEbS4W3KQFaoq2IbC8Z6rxrvk46MkI6tgcmhFRy9amJTG48myOZdg8OuKsex4aKxDgevUajHk9PgtXLR1GTjlFav5brcEKP8bV/o+YqkSeVylPHY+UtfzzNrZO4OT6ZGZSfa3cFvpNMosmuRQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '6a5f9c0a5f70c92c3d64186f9a14ec16'
}
const client = new Client(config);
const unirest = require("unirest");
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
app.get('/reply', function(req, res){
var USERID = req.query.token;
var COMMAND = req.query.command;
var PIN = parseInt(req.query.pin,10);
var VAL = req.query.val;
var equipment = ['IN0','IN1','IN2','IN3','IN4','D5','D6','D7'];
var msg = '';
var action = '';
  if (COMMAND === 'check'){
    if (VAL === 'on'){
      msg = equipment[PIN] + ' ถูกเปิดอยู่';
      action = 'off';
    }else if (VAL === 'off'){
      msg = equipment[PIN] + ' ถูกปิดอยู่';
      action = 'on';
    }
    //create rich menu for user
    var id ="";
    client.createRichMenu({
           size: { width: 2500, height: 843 }, // Define size of rich menu
           selected: true, // Always display
           name: 'Button', // rich menu name
           chatBarText: 'Button', // show to user
           areas: [ // Area and action of each boundary
               {
                   bounds: {
                       x: 0,
                       y: 0,
                       width: 1250,
                       height: 843
                   },
                   action: {
                       type: 'message',
                       text: 'on,'+PIN.toString()
                   }
               },
               {
                   bounds: {
                       x: 1251,
                       y: 0,
                       width: 2500,
                       height: 843
                   },
                   action: {
                       type: 'message',
                       text: 'off,'+PIN.toString()
                   }
               }
         ]
       })
    .then(async function(richMenuId){
      id = richMenuId;
      console.log(id);
      var result = await client.setRichMenuImage(id, fs.createReadStream('ButtonMenu.png'))
      result = await client.linkRichMenuToUser(USERID, id)
    })
    //=========================
  }else{
    if (COMMAND ==='on'){
      msg = equipment[PIN] +' ถูกเปิดแล้ว';
    }else if(COMMAND === 'off'){
      msg = equipment[PIN] +' ถูกปิดแล้ว';
    }else{
      msg = "unknow command";
    }
    //delete al rich menu
    var richMenuList;
    var menuId = [];
    client.getRichMenuList()
    .then(function(richMenuList){
      richMenuList.forEach((list) => {
        console.log(list.richMenuId)
        menuId.push(list.richMenuId);
        //client.deleteRichMenu(list.richMenuId)
        //client.unlinkRichMenuFromUser(USERID, list.richMenuId)
      })
    })
    menuId.forEach((id) =>{
      console.log(id)
      client.deleteRichMenu(id)
      client.unlinkRichMenuFromUser(USERID, id)
    })
    //===================
  }
  client.pushMessage(USERID, { type: 'text',text: msg})
  res.sendStatus(200);
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
