const User = require('../models/user');
const bcrypt = reqiure('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/production');

exports.customerSignUp = async (req, res) => {
    req.checkBody('email').exists().withMessage('Email is required');
    req.checkBody('password').exists().withMessage('Password is required');
    req.checkBody('confirmPassword').exists().withMessage('Password is required');
    req.checkBody('email').isEmail().withMessage('Please include a valid email');
  
    req
      .checkBody('password')
      .withMessage('Password needs to be at least 8 characters')
      .isLength({
        min: 8,
        max: undefined,
      });
  
    req
      .checkBody('confirmPassword')
      .withMessage('Password confirmation does not match password')
      .custom((value, { req }) => value == req.body.password);
    };
