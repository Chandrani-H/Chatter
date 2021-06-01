const express = require('express');
const bodyParser = require('body-parser');
import { Request, Response } from "express";
import routes from './app/routes/chatter.routes';

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require routes
// require('./app/routes/chatter.routes.ts');
app.use('/', routes);

app.use(express.static('hello-react-frontend/build/'));

// Configuring the database
import dbConfig from './config/database.config';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// Connecting to the database
try {
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
console.log("Successfully connected to the database");
} catch(err) {   
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
}

// define a simple route
app.get('/', (req:Request, res:Response) => {
    res.json({"message": "Welcome to Chatter application."});
});

const PORT = process.env.PORT || 8080;

// listen for requests
app.listen(PORT, console.log(`Server started on port ${PORT}`));