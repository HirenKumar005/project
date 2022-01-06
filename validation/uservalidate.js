const Joi = require('joi');

function validateUserRegister(req) {
    const schema = {

        first_name: Joi.string().min(3).required().empty(),
        last_name: Joi.string().min(3).required().empty(),
        email: Joi.string().min(3).required().email(),
        phone: Joi.number().min(10).required(),
        password: Joi.string().required().empty(),
        repassword: Joi.string().required().empty().valid(Joi.ref('password')),
        profile: Joi.required(),
        gender: Joi.required(),
        country: Joi.required(),
        hobbies: Joi.required()


    };
    return Joi.validate(req, schema);
}
function validateUserloging(req) {
    const schema = {
        email: Joi.string().min(3).required().email(),
        password: Joi.string().required().empty(),
    };
    return Joi.validate(req, schema);
}
function validateResetPassword(req) {
    const schema = {
        password: Joi.string().required().empty(),
        repassword: Joi.string().required().empty().valid(Joi.ref('password'))
    };
    return Joi.validate(req, schema);
}
function validateUpdateProfile(req) {
    const schema = {

        first_name: Joi.string().min(3).required().empty(),
        last_name: Joi.string().min(3).required().empty(),
        email: Joi.string().min(3).required().email(),
        phone: Joi.number().min(10).required(),
        profile: Joi.required(),
        gender: Joi.required(),
        country: Joi.required(),
        hobbies: Joi.required()


    };
    return Joi.validate(req, schema);

}
function validateReset(req) {
    const schema = {
        oldPassword: Joi.string().required().empty(),
        newPassword: Joi.string().required().empty(),
        repassword: Joi.string().required().empty().valid(Joi.ref('newPassword'))
    };
    return Joi.validate(req, schema);
}
module.exports = {
    validateUserRegister, validateUserloging, validateResetPassword, validateUpdateProfile, validateReset
};