const mongoose = require('mongoose');

// localhost would not load graphql so I replaced it with 127.0.0.1:27017

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
