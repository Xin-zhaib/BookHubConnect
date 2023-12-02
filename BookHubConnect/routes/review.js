var express = require('express');
var router = express.Router();
const Review = require('../models/review');

router.get('/list', async function (req, res){
    const list = await Review.find({book: req.query.bookId}).populate('user')
    res.render('review-list', {
        reviews: list
    })
})

router.post('/add', async function (req, res){
    const review = Review({
        score: req.body.score,
        content: req.body.content,
        createTime: new Date(),
        book: req.body.bookId,
        user: req.session.user._id
    })
    await review.save()
    req.session.msg = 'Book added successfully';
    res.redirect('/book/list');
})

module.exports = router;
