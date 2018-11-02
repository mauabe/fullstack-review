const bodyParser = require('body-parser');
const github = require('../helpers/github');
const server = require('../server/index');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect('mongodb://localhost:27017/fetcher', {useMongoClient: true });

let repoSchema = new Schema({
  username: String,
  id: Number,
  repo: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  if (repos.message === "Not Found"){
    return callback(repos, null);
  };

  const repoInfo = repos.map(function(repo){
  return {
    id: repo.id,
    username:repo.full_name,
    url: repo.html_url,
    stargazers_count: repo.stargazers_count
  };
  });

  const batch = Repo.collection.initializeOrderedBulkOp();
  repoInfo.forEach(repo => {
    batch
      .find ({ id : repo.id})
      .upsert()
      .replaceOne(repo);
  });
  batch.execute(callback);
}

// mongoose.Promise = global.Promise;
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function(){console.log('Connection to DB successful!')});


module.exports.Repo = Repo;
module.exports.save = save;