var express = require('express');
var router = express.Router();

var UserModel = require('../models/user');
var QuoteModel = require('../models/quote');

router.get('/', async function(req, res, next) {
  try{
    let query ={
      page:0,
      limit:8
    };
    Object.keys(req.query)
      .forEach(function eachKey(key) { 
        query[key] = req.query[key]
    });
    let quotes_data = await QuoteModel.getQuotes(undefined,query).rows();
    for(i in quotes_data){
      let param={
        user_id:quotes_data[i].author_id
      };
      
      let [author_data] = await UserModel.getUser(param,"display_name,username,profile_picture").rows();
      if(author_data !== 0){
        quotes_data[i].author = author_data;
      }
      delete quotes_data[i].author_id;
      delete quotes_data[i].user_id;
    }  
    res.status(200).json({
      data:quotes_data
    });
  }catch(err){
    console.log(err)
    res.status(500).json({
      message: 'Something wrong!'
    });
  }  
});


router.post('/', async function(req, res, next) {
  let data = req.body
  let param = {
    slack_id:data.user_id
  }
  let quote ={
    user_id:'',
    message:'',
    author_id:0
  }
  try{
    //check if the sender is a created user.
    let user = await returnUser(param,data);
    let message = data.text.replace(/by: <@(\w+)\|(\w+)\>/g, "");
    quote.user_id = user.id;    
    quote.message = message.trim();
    
    //check if author is a created user
    let [author_data] = extractUserId(data.text);
    if(typeof author_data !== "undefined"){
      let author_object ={
        user_id:author_data.slack_id,
        user_name:author_data.username
      }
      let author = await returnUser(author_data,author_object);
      quote.author_id = author.id;
    }
    await QuoteModel.save(quote).returning('*').row();
    res.status(200).json({
      message: 'Quote inserted!'
    }); 
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: 'Something wrong!'
    });   
  }
});

async function returnUser(param,data){  
  
  let [user_data] = await UserModel.getUser(param).rows();  
  if(typeof user_data === "undefined" ){    
    let user_profile = await UserModel.getUserProfileSlack(param.slack_id);
    data.profile = user_profile; 
    let new_user = await  UserModel.save(data).returning('*').row();
    return new_user;
  }else{
    return user_data;
  }
}

function extractUserId(message){
  var shortcode_regex = /\<@(\w+)\|(\w+)\>/g;
  var matches = [];
  message.replace(shortcode_regex, function(match, code, id) {
      matches.push({
          slack_id: code,
          username: id
      });
  });
  return matches;
}

module.exports = router;