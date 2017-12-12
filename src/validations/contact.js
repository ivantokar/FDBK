const Validator = require('validator')
	, isEmpty = require('lodash/isEmpty');

module.exports = function validateInput(data) {
    let errors = {};

	if (Validator.isEmpty(data.email)) { errors.email = 'Email is required'; }
	if (!Validator.isEmail(data.email)) { errors.email = 'Email is invalid'; }
    if (Validator.isEmpty(data.message)) { errors.message = 'Message is required'; }
    if (!Validator.isLength(data.message, {min:0, max:1000})) { errors.message = 'Message is too long, max length 1000 characters'; }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};