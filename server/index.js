//express is the framework we use to quickly build our node server
const express = require('express')

// SCREW BODY PARSER, USE express.json

// dotenv allows us to access the .env file at the root
// we will store private information in the .env file
require('dotenv').config()
// massive is the library we will use to connect our express server to our postgres db
const massive = require('massive')
// invoking express which returns an object. we attach it to the app variable so we can use diferent methods
const app = express()
// destructure SERVER_PORT and CONNECTION_STRING from process.env which is access our .env fil at our root
const { SERVER_PORT, CONNECTION_STRING } = process.env

// using the json method on every request. this is a middleware which you will learn about next week. Forget body-parser
app.use(express.json())

//massive is a data mapper. Here we are passing in our connecting string from process.env. This will connect to our db hosted on postgres. Once that happens, we will set our db on app using app.set. The massive function sends back a reference to the db we are calling database here. You can call it whatever you want.
massive(CONNECTION_STRING).then((database) => {
  // setting our database to a key called 'db'
  app.set('db', database)
  // just to let us know that we are set and connected
  console.log('DB set!')
  // handy function to see what tables you have created and have access to
  console.log(database.listTables())
})

// get request for all users
app.get('/api/users', (req, res) => {
  // grab the reference to the db we set in massive
	req.app
    .get('db')
    // look for a sql command called getAllUsers in the db folder at the rooter of our project
    .getAllUsers()
    // once that has ran, send back the users
		.then((users) => {
			res.status(200).send(users)
		})
})

// get request for user by id
app.get('/api/user/:id', (req, res) => {
  // pull id of off req.params
  const { id } = req.params
  // same as above, snag our db
	req.app
    .get('db')
    // look for command called getUserByID in the db folder at the root passing in the destructured id from req.params as an argument.
    // inside of the getUserByID command in the db folder, you will see a $1. This is a placeholder for whatever we are passing in, in this case id
    .getUserByID(id)
    // send back the user
		.then((user) => {
			res.status(200).send(user)
		})
})

// get request where we query by name
app.get('/api/userByName', (req, res) => {
	const { name } = req.query
	req.app
    .get('db')
    // passing in name as an argument
    // check out the sql command for the way to compare search
		.getUserByName(name)
		.then((user) => {
			res.status(200).send(user)
		})
})

// create a new user
app.post('/api/user', (req, res) => {
  // pull data off of the body
	const { first_name, last_name, email } = req.body
	req.app
    .get('db')
    // createUser command in db folder. Here we pass in an array of arguments. Check out the command itself. You will notice a $1, $2, $3 as placholders. The order you pass these in matters
		.createUser([first_name, last_name, email])
		.then(() => {
			res.status(200).send('User created!')
		})
})

// delte user
app.delete('/api/user/:id', (req, res) => {
	const { id } = req.params
  req.app.get('db')
  .deleteUser(id)
  .then(() => {
    res.status(200).send('User Deleted!')
  })
})

//starting up our server
app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`))
