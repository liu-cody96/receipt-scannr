const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/connection');
const mongoose = require('mongoose');


//authentication
const { authMiddleware } = require('./utils/auth');

//instructs which port the server will listen on
const PORT = process.env.PORT || 8000;


//initializes express
const app = express();


//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));



// ---> In prod, when we no longer need to use the Create React App development server, we set up our server to serve the built React front-end application that is in the ../client/build directory.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


// ---> Since the React front-end application will handle its own routing, we set up a wildcard route on our server that will serve the front end whenever a request for a non-API route is received.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


  app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
});