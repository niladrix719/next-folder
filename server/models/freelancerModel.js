const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    min: 10,
    unique: true,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  equipments: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  coverPicture: {
    type: String,
    required: true
  },
  addharCard: {
    type: String,
    required: true
  },
  panCard: {
    type: String,
    required: true
  },
  works: {
    type: Array,
    required: true,
    items: {
      type: String
    }
  },  
  links: {
    type: Array,
    required: true,
    items: {
      type: String
    }
  },  
  termsAndConditions: {
    type: Boolean,
    required: true
  }
});

const freelancerCollection = new mongoose.model('freelancercollection', freelancerSchema);

module.exports = freelancerCollection;