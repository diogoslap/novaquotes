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

module.exports = router;