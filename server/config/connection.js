const mongoose = require('mongoose');

// localhost would not load graphql so I replaced it with 127.0.0.1:27017

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/furry-meme', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
