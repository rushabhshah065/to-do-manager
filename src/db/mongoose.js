const mongoose = require('mongoose');

console.log('database name', process.env.DATABASE_NAME)

mongoose.connect(process.env.MONGO_URL + "/" + process.env.DATABASE_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});