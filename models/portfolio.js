
const mongoose = require('mongoose')
const Category = require('./category')
const portfolioSchema = new mongoose.Schema({
    project_category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    porject_name: {
        type: String,
        required: true
    },
    profile: {
        type: Array
    },
    porject_title: {
        type: String,
        required: true
    },
    porject_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }


});
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
exports.Portfolio = Portfolio;