const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Genre = require('../models/genre');
const mongoose = require("mongoose");

router.get('/list', async (req, res) => {
    try {
        const genre = req.query.genre
        const msg = req.session.msg;
        delete req.session.msg
        // 查询书籍列表并计算评分平均分
        const config = [
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'book',
                    as: 'reviews'
                }
            },
            {
                $lookup: {
                    from: 'genres', // 假设 'genres' 是存储 Genre 信息的集合名称
                    localField: 'genre',
                    foreignField: '_id',
                    as: 'genreInfo'
                }
            },
            {
                $project: {
                    title: 1,
                    author: 1,
                    details: 1,
                    isbn: 1,
                    genre: '$genreInfo', // 将关联的 Genre 信息放入 'genre' 字段中
                    reviewCount: {$size: '$reviews'},
                    totalScore: {$sum: '$reviews.score'}
                }
            },
            {
                $addFields: {
                    averageScore: {
                        $cond: {
                            if: {$eq: ['$reviewCount', 0]},
                            then: 0,
                            else: {$divide: ['$totalScore', '$reviewCount']}
                        }
                    }
                }
            },
            {$sort: {createTime: -1}}
        ]
        if (genre) {
            config.unshift({
                $match: {
                    genre: mongoose.Types.ObjectId(genre)
                }
            })
        }
        const books = await Book.aggregate(config)
        const genres = await Genre.find()
        res.render('home', {books, genres, msg, genre}); // 渲染 bookList.pug 模板，并传递 books 数据
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get('/myself', async (req, res) => {
    try {
        const msg = req.session.msg;
        delete req.session.msg
        // 查询书籍列表并计算评分平均分
        const books = await Book.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(req.session.user._id) // 匹配特定用户的 ObjectId
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'book',
                    as: 'reviews'
                }
            },
            {
                $lookup: {
                    from: 'genres', // 假设 'genres' 是存储 Genre 信息的集合名称
                    localField: 'genre',
                    foreignField: '_id',
                    as: 'genreInfo'
                }
            },
            {
                $project: {
                    title: 1,
                    author: 1,
                    details: 1,
                    isbn: 1,
                    genre: '$genreInfo', // 将关联的 Genre 信息放入 'genre' 字段中
                    reviewCount: {$size: '$reviews'},
                    totalScore: {$sum: '$reviews.score'}
                }
            },
            {
                $addFields: {
                    averageScore: {
                        $cond: {
                            if: {$eq: ['$reviewCount', 0]},
                            then: 0,
                            else: {$divide: ['$totalScore', '$reviewCount']}
                        }
                    }
                }
            },
            {$sort: {createTime: -1}}
        ])
        res.render('mybook', {books, msg}); // 渲染 bookList.pug 模板，并传递 books 数据
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
})

router.get('/add', async function (req, res) {
    const genres = await Genre.find();
    const msg = req.session.msg;
    delete req.session.msg
    res.render('addbook', {genres, msg})
})

router.post('/add', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        details: req.body.details,
        isbn: req.body.isbn,
        genre: req.body.genre,
        user: req.session.user._id
    });
    try {
        await book.save()
        req.session.msg = 'Book added successfully';
        res.redirect('/book/add');
    } catch (err) {
        res.render('addbook', {msg: 'The book failed to add'});
    }
});

router.get('/remove/:id', async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);
        req.session.msg = 'Book removed successfully';
    } catch (err) {
        req.session.msg = 'Failed to delete the book';
    }
    res.redirect('/book/list');
})

router.get('/update/:id', async (req, res) => {
    try {
        const msg = req.session.msg;
        delete req.session.msg
        const genres = await Genre.find();
        const book = await Book.findById(req.params.id);
        res.render('editbook', {book, genres, msg});
    } catch (err) {
        req.session.msg = 'Failed to delete the book';
        res.redirect('/book/myself')
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        req.session.msg = 'Book updated successfully';
    } catch (err) {
        req.session.msg = err.message
    }
    res.redirect('/book/update/' + req.params.id);
});

module.exports = router;
