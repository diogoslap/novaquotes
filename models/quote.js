var dbconfig = require('../config/database');
var db = require('pg-bricks').configure(dbconfig);

function save(data) {  
   return db.insert('quotes', data);
}

function getQuotes(params,query_param = null) {
  let query = db.select('q.*,u.username,u.display_name,u.profile_picture').from('quotes q')
  .join('user u', {'u.id': 'q.user_id'})
  if(params !== undefined && params.user_id !== undefined && params.user_id !== null){
    query.where({user_id:params.user_id});
  }
  if(params !== undefined &&  params.author_id !== undefined && params.author_id !== null ){
    query.where({author_id:params.author_id});
  }

  if(query_param.limit !== undefined && query_param.limit > 0){
    query.limit(query_param.limit);
    let offset = query_param.page*query_param.limit;
    query.offset(offset);
  }

  query.orderBy("q.created_date DESC");
 
  return query;
}


module.exports = {
  getQuotes: getQuotes, 
  save:save
};