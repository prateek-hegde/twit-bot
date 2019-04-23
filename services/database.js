const mongoose = require('mongoose');
const config = require('../config/setup')

//database connection
mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true }).then((e) => {
  console.log('database connected');
}).catch((err) => {
  console.log(err);

  // console.log('databse connection error');
});
