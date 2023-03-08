const express = require('express');
// const db = require('./config/connection');
const pg = require('pg');
const path = require('path');
const cors = require('cors');

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
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }


// ---> Since the React front-end application will handle its own routing, we set up a wildcard route on our server that will serve the front end whenever a request for a non-API route is received.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


const conString = "postgres://aqrlxkyf:CPNpGVPcQL-7my7wzzrgjIXP3GMKP64d@kashin.db.elephantsql.com/aqrlxkyf" //Can be found in the Details page
const client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
  });
});


app.get('/', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM users');
        res.json(results);
    } catch (err) {
        console.log(err);
    }
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
});