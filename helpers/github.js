const request = require('request');
const config = require('../config.js');

let getReposByUsername = function (username, cb) {

  // console.log('IN GITHUB HELPER' , username)
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, response, body) {
    if (err) {
      //console.log('ERROR IN HERE, PLEASE PRINT!')
      return cb(err, null);
    }
    console.log('IN GITHUB REQUEST MODULE', body)
      cb(null, body);
  });
};

module.exports.getReposByUsername = getReposByUsername;