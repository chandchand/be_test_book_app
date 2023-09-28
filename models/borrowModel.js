const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    member_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Member",
        required: true,
        index: true
    },
    book_id:[{
        type: mongoose.Schema.ObjectId,
        ref: "Member",
        required: true,
        index: true
    }],
    borrow_date: {
        type: Date,
        required: true,
    },
    return_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['returned', 'borrowed'],
        default: 'borrowed'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },

})
module.exports = mongoose.model('Borrow', borrowSchema);

