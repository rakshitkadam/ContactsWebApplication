const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error('User already registered!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    
    const user  = await User.create({
        username: username,
        password: hashedPassword,
        email: email
    });

    console.log(`User created ${user}`);
    if(user) {
        res.status(201).json({id: user.id, email: user.email});
    } else {
        res.status(400).json('User data is not valid');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('Filling email & password is mandatory');
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200);
        const accessToken = jwt.sign({
            user : {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"100m"
        });
        res.status(200).json({ acccessToken: accessToken});
    } else {
        res.status(401);
        throw new Error('Password is not valid');
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json({"user": req.user});
});
module.exports = { registerUser, loginUser, currentUser };