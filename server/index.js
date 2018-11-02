const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index');
const request = require('request');
const path = require('path');

const hostname = '127.0.0.1';

const app = express();


app.use(express.static(path.resolve(__dirname + '/../client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/repos', function (req, res) {
  let username = req.body.term;
  //console.log('in the post1', username,  req.body.term);
  
  github.getReposByUsername(username, function(err, data){
    // console.log('in the post2', username,  req.body.term);
    if (err) { 
      return res.status(500).send(err);
    }
    const repos = JSON.parse(data)
    db.save(repos, function (err, data){
      if (err){
      return res.send(err);
      }
    res.send(data);
    });
  });
});

app.get('/repos', function (req, res) {
  let username = req.query;

  // console.log('getting to app-get:', req.query);
  db.Repo.find({})
  .limit(25)
  .sort({stargazers_count: -1})
  .exec(function (err, data){
    if (err){
      return res.send(err);
    }
    return res.send(data);
  });
});
let port = 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

