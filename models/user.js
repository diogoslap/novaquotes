var dbconfig = require('../config/database');
const instance = require('../config/api')
var db = require('pg-bricks').configure(dbconfig);
const token = process.env.API_TOKEN || '';


function save(data) {
  let user ={
    display_name:data.profile.real_name,
    slack_id:data.user_id,
    username:data.user_name,
    profile_picture:data.profile.image_192,
  }
   return db.insert('user', user);
}

function getUser(params, fields="*") {
  let query = db.select(fields).from('user');
  if(params !== undefined && params.slack_id !== undefined && params.slack_id !== null){
    query.where({slack_id:params.slack_id});
  }
  if(params !== undefined &&  params.user_id !== undefined && params.user_id !== null ){
    query.where({id:params.user_id});
  }

  if(params !== undefined && params.username !== undefined && params.username !== null ){
    query.where({username:params.username});
  }
  
  return query;
}

async function getUserProfileSlack(user_id){
  if(token){
    try{
      user_profile = await instance.get('/users.profile.get',{
        params:{
          token,
          user:user_id
        }
      })
     return user_profile.data.profile
     
    }catch(error){
      console.log(error);
      return error;
    }   
  }
}

module.exports = {
  getUser: getUser, 
  getUserProfileSlack:getUserProfileSlack, 
  save:save
};