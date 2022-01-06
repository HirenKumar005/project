const Joi = require('joi');
function validateAddcategory(req) {
    const schema = {
        category: Joi.string().min(3).required(),

    };
    return Joi.validate(req, schema);
}
module.exports = {
    validateAddcategory
};