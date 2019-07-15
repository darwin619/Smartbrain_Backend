const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/Register');
const signin = require('./Controllers/SignIn');
const profile = require('./Controllers/Profile');
const image = require('./Controllers/Image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=> res.send('it is working!'));

app.post('/signin', (req, res) => signin.signInHandle(req, res, db, bcrypt));
//Dependency Injection

app.post('/register', (req, res) => register.registerHandle(req, res, db, bcrypt));
//Dependency Injection

app.get('/profile/:id', (req, res) => profile.profileHandle(req, res, db));
//Dependency Injection

app.put('/image', (req, res) => image.imageHandle(req, res, db));
//Dependency Injection

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

//Dependency Injection
	

app.listen(process.env.PORT || 3000, () => {
	console.log('App is running on ${process.env.PORT}')
})



