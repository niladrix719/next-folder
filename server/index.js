// Importing modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db');
const signupController = require('./controllers/signupController');
const registerFreelancerController = require('./controllers/registerFreelancerController');
const registerCompanyController = require('./controllers/registerCompanyController');
const freelancerCollection = require('./models/freelancerModel');

// Creating the app
const app = express();

// Setting up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.static('public'));
const upload = require('./middlewares/storage');

// Setting up the routes  
app.post('/signup', signupController);
app.post('/register/freelancer', upload, registerFreelancerController);
app.post('/register/company', registerCompanyController);

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));