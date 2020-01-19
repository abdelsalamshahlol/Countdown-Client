var mongoose = require('mongoose');
const validator = require("validator");

var userSchema = mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  hashedPassword: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;