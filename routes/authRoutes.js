const express = require('express');
const user = require('../models/user');
const mongooose = require('mongoose')
const jwt = require('jsonwebtoken');
const router = express.Router();
const multer = require('multer');
const cookie = require('cookie-parser');
const cors = require('cors');

function authverify(req, res, next) {
    var incomimg_token = req.cookies;
    
    if (!incomimg_token || !incomimg_token['X-Auth-Token']) {
        // res.status(400).send("No token");
        res.redirect("/login");
    }
    console.log(incomimg_token);
    jwt.verify(incomimg_token, 'This is supposed to be secret , made with <3 by tba', (err, decodedtoken) => {
        if (err) {
            // console.log(err);
            res.redirect("/login");
        }
        else {
            console.log(decodedtoken);
            next();
        }
    });
}

router.post('/auth/login', multer().none(), async (req, res) => {
    var name = req.body.username;
    var password = req.body.password;
    const loggingUser= await user.find({ 'name': name, 'password':password }).exec();
    console.log(loggingUser)
    if (loggingUser.length == 0) {
        res.status(403).send((await user.exists({ "name": name })) ? "Password Incorrect" : "User Doesn't Exists")
    }
    else {
        console.log({name,password})
    var user_id = loggingUser._id;
    var token = jwt.sign({ user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
    res.cookie('X-Auth-Token', token, { maxAge: 86400000 });
        res.redirect('/');
    }
})

router.post('/auth/signup', multer().none(),async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body)
    if (await user.exists({ username })) {
        res.status(400).send("User Already Exists")
    }
    else {
        try {
            var usr = await user.create({ 'name':username, 'password':password });
            console.log(usr._id);
            var user_id = usr._id;
            var token = jwt.sign({ user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
            res.cookie('X-Auth-Token', token , {maxAge: 86400000});
            // res.status(201).json({ token, usr });
            res.redirect('/auth/login');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
})

router.get('/auth/logout', (req, res) => {
    res.cookie('X-Auth-Token', '', { maxAge: 1 });
    res.redirect('/')
})

module.exports.router = router;
module.exports.authverify = authverify;
