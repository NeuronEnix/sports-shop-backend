const Joi = require( '@hapi/joi' ) ;

const commonSchema = {
    _id : Joi.string().length(24),
    pageNo : Joi.number().min(0).max(100).required(),
}

module.exports = { commonSchema };
