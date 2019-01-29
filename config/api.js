const axios = require('axios');
const instance = axios.create({
  baseURL: 'https://slack.com/api'
});

module.exports = instance