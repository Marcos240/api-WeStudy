const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Routes init
route(app);

// set port, listen for requests
const PORT  = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

