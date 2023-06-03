if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const BASE_ROUTE = "/api/v1";

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// public routes

// auth router goes here

// protected routes


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});