const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL + process.env.DATABASE_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).connection.on('error', console.error.bind(console, 'MongoDB connection error:'));