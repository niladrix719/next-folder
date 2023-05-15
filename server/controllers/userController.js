const userCollection = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// signup

async function signupController (req, res) {
  try {
    const userData = new userCollection({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone
    });

    const user = await userData.save();
    jwt.sign({ user }, secret, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

//OTP

function sendTextMessage(phoneNumber, message) {
  phoneNumber = "+91" + phoneNumber.toString();
  twilio.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  }).then((message) => console.log(message.sid));
}

// login

const loginController = async (req, res) => {
  try {
    const phone = req.body.phone;
    const user = await userCollection.findOne({ phone: phone });

    if (!user) {
      return res.sendStatus(403);
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    sendTextMessage(phone, `Hi ${code} is your one time password to login on Fipezo. Do not share this with anyone. -Team Fipezo`);

    jwt.sign({ user }, secret, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  signupController,
  loginController
};