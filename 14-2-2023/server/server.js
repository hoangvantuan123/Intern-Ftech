const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routers/user');
const cors = require('cors');
const products = require('./products');
//
const app = express();
app.use(passport.initialize());
require('./passport')(passport);
// DB
mongoose.set('strictQuery', false);
const MongoDBURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auth';
mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
});


//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//
app.use('/api/users', users);


app.get('/', (req, res) => {
  res.send('Welcom our to app auth');
});


app.get('/products' , (req, res) => {
  res.send(products)

})

const PORT = process.env.PORT || 5000;

//
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`)
})