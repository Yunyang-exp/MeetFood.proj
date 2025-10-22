const User = require('../models/user');
const bcrypt = reqiure('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/production');

exports.customerSignUp = async (req, res) => {
    // data validation
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
    
    // Pre-check
    const errors = req.validationErrors();
    if (errors || errors.length > 0) {
        return res.status(400).json({ errors: errors});
    }

    //Parameter guard
    const numOfParams = Object.keys(req.body).length;
    if (numOfParams > 3) {
        return res
            .status(400)
            .json({ errors: [{msg: 'Bad Request, too many parameters.'}]});
    }
    const {email, password} = req.body;

    try {
        // Check if the users already exist
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'Email already registered, Please sign in.'}],
            });
        }

        //Create a new user to save
        user = new User({
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save to the database
        await user.save();

        //prepare payload for jwt token
        const payload = {
            user: {
                id: user.id,
            },
        };

        //sign and return jwt token
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: config.jwtExpireTime },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: 'User account created successfully.',
                    token,
                });
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.customerSignIn = async (req, res) => {
    // data validation
    req.checkBody('email').exists().withMessage('Email is required');
    req.checkBody('password').exists().withMessage('Password is required');
    req.checkBody('email').isEmail().withMessage('Please include a valid email');
    
    // Pre-check
    const errors = req.validationErrors();
    if (errors || errors.length > 0) {
        return res.status(400).json({ errors: errors});
    }

    //Parameter guard
    const numOfParams = Object.keys(req.body).length;
    if (numOfParams > 2) {
        return res
            .status(400)
            .json({ errors: [{msg: 'Bad Request, too many parameters.'}]});
    }
    const {email, password} = req.body;

    try {
        // Check if the users already exist
        let user = await User.findOne({ email });

        if (!user) {
            return res
            .status(400)
            .json({
                errors: [{ msg: 'No user registered by this email'}],
            });
        }

        // if the user exists, compare if the req password is the same as the user encrypted password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
            .status(400)
            .json({ errors: [{msg: 'Invalid Credentials.'}]});
        }

        //prepare payload for jwt token
        const payload = {
            user: {
                id: user.id,
            },
        };

        //sign and return jwt token
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: config.jwtExpireTime },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: 'User account created successfully.',
                    token,
                });
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
