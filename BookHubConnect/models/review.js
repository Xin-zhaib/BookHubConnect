var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {
        score: {type: Number, required: true},
        content: {type: String, required: true},
        createTime: {type: Date, required: true},
        user: [{type: Schema.Types.ObjectId, ref: 'User'}],
        book: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    }
);


//Export model
module.exports = mongoose.model('Review', ReviewSchema);
