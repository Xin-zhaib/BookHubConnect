var express = require('express');
var router = express.Router();
const User = require('../models/user');

const crypto = require('crypto');


router.get('/login', function (req, res){
    res.render('login');
})

router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            console.log(err);
            res.render('login', { msg: 'Login failed' });
        } else {
            if (user) {
                const hash = crypto.createHash('md5');
                hash.update(req.body.password);
                const encryptedString = hash.digest('hex');
                if (user.password === encryptedString) {
                    req.session.user = user;
                    res.redirect('/book/list');
                } else {
                    res.render('login', { msg: 'Incorrect username or password' });
                }
            } else {
                res.render('login', { msg: 'The username does not exist' });
            }
        }
    })
});

router.get('/register', function (req, res){
    res.render('register');
})

router.post('/register', function (req, res){
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            console.log(err)
            res.render('register', { msg: 'Registration failed' });
        } else {
            if (user) {
                res.render('register', { msg: 'The username already exists.' });
            } else {
                const hash = crypto.createHash('md5');
                hash.update(req.body.password);
                const encryptedString = hash.digest('hex');
                const newUser = new User({
                    username: req.body.username,
                    nickname: req.body.nickname,
                    password: encryptedString,
                    role: parseInt(req.body.role),
                });
                newUser.save((err, savedUser) => {
                    if (err) {
                        res.render('register', { msg: 'Registration failed' });
                    }else {
                        res.render('register', { msg: 'Registration successful' });
                    }
                })
            }
        }
    })
})

router.get('/logout', function (req, res){
    delete req.session.user
    res.redirect('/book/list')
})

module.exports = router;
