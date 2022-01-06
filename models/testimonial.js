
const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profile: {
        type: String

    }

});
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
exports.Testimonial = Testimonial;