const Joi = require('joi');
function validateAddPortfolio(req) {
    const schema = {
        project_category: Joi.required(),
        porject_name: Joi.string().min(3).required(),
        porject_title: Joi.string().min(3).required(),
        porject_date: Joi.required(),
        description: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),
        designation: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        profile: Joi.required()


    };
    return Joi.validate(req, schema);
}
module.exports = {
    validateAddPortfolio
};