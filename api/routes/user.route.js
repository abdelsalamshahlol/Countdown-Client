const express = require('express');
const app = express();
const userRoutes = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let User = require('../db/models/userModel')

userRoutes.route('/signup').post( (req, res) => {
  let {firstName, lastName, email, password} = req.body
  User.find({ email })
  .then(result => {
    if (result.length !== 0) {
      res.status(301).json({registered: false, msg: 'user already exist'});
    } else {
      var token;
      //hash the password and saved it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        const newUser = new User({
          firstName,
          lastName,
          email,
          hashedPassword
        });
        if (req.body.isAdmin) {
          newUser.isAdmin = true
        }
        newUser.save()
        .then(registeredUser => {
          token = jwt.sign(
            { _id: registeredUser.id }, // id of new user created
            process.env.TOKEN_SECRET,
            { expiresIn: 3600 }
          )
          res.header('auth-token', token) //saving the token in the header !!
          res.status(200).json({ registered: true, msg: "user registered!", token, userId: registeredUser._id})
        })
        .catch(err => {
          res.json({ registered: false, msg: "invalid email!" })
        })
      })
    }
  })
  .catch(err => {
    res.status(400).json({ registered: false, msg: "some error..." })
  });
});

userRoutes.route('/getAll').get( (req, res) => {
  User.find(function (err, users){
    (err) ? console.log(err) : res.json(users)
  });
});

userRoutes.route('/:id').get( (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
      res.json(user);
  });
});

userRoutes.route('/delete/:id').delete(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err, user){
      (err) ? res.json(err) : res.json({"msg": 'Successfully removed'});
  });
});

userRoutes.route('/login').post( (req, res) => {
  const { email, password } = req.body

  User.findOne({ email })
  .then(user => {
    if ( !user ) {
      res.status(301).json({authed: false, msg: 'user doesnt exist'});
    } else {
      bcrypt.compare(password, user.hashedPassword)
      .then((match) => {
        if (!match) {
          res.status(301).json({ authed: false, msg: "incorrect password !" })

        } else {
          //create and assign a token
          const token = jwt.sign(
            { _id: user.id },// id from database
            process.env.TOKEN_SECRET,
            { expiresIn: 3600 }
            )
          res.header('auth-token',token) //saving the token in the header !!
          res.status(200).json({ authed: true, msg: "correct password !", token, userId: user._id, isAdmin: user.isAdmin})
          //redirect user
        }
      })
    }
  })
  .catch(err => {
    res.status(400).json({ authed: false, msg: "some error..." })
  });
});

module.exports = userRoutes;