const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });
    return false;
  }
  return true;
}

module.exports = {
  signUp: (req, res, next) => {
    debugger;
     if (validateUser(req, res)) {
      const {  username, password,location,isAdmin } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      User.create({ 
        
        hashedPassword,
        username,
        location,
        salt,
        isAdmin
      }).then((user) => {
        res.status(201)
          .json({ message: 'success', userId: user._id, username: user.username,location:user.location });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
         next(error);
      });
    }
  },
  signIn: (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this username could not be found');
          error.statusCode = 401;
          throw error;
        }
        if(!user.authenticate(password)) {
          const error = new Error('Invalid password');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign({ 
          username: user.username,
          userId: user._id.toString()
        },
          'parola',
         { expiresIn: '1h' });
        debugger
         res.status(200).json(
           { 
             
             message: 'logged in!',
             
             token, 
             location:user.location,
             userId: user._id.toString(),
             username: user.username,
             isAdmin: user.isAdmin
           });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
};