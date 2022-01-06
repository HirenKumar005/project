const Joi = require('joi');
function validateAddContact(req) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        number: Joi.number().min(3).required(),
        message: Joi.string().min(3).required(),
        date: Joi.required()


    };
    return Joi.validate(req, schema);
}
module.exports = {
    validateAddContact
};