var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        details: {type: String, required: true},
        isbn: {type: String, required: true},
        genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
        user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    }
);


//Export model
module.exports = mongoose.model('Book', BookSchema);
