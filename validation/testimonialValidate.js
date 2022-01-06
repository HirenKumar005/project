const Joi = require('joi');
function validateAddTestimonial(req) {
    const schema = {
        name: Joi.string().min(3).required(),
        designation: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        profile: Joi.required()


    };
    return Joi.validate(req, schema);
}
module.exports = {
    validateAddTestimonial
};