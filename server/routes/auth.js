const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/signup', 
  [
    
   
    body('password')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Please enter a valid password.'),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid username.'),
      
  ]
  
, authController.signUp);

router.post('/signin', authController.signIn);

module.exports = router;
