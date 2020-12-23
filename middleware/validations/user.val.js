const Joi = require( '@hapi/joi' ) ;

const userSchema = {
    email : Joi.string().trim().min( 1 ).max( 50 ).required(),
    pass : Joi.string().trim().min( 1 ).max( 50 ).required(),
    name : Joi.string().trim().min( 1 ).max( 50 ).required(),
    type : Joi.string().trim().min( 1 ).max( 1  ).required(),
} ;

const user = {

    signUp : Joi.object({
        name : userSchema.name,
        email : userSchema.email,
        pass : userSchema.pass,
        type : userSchema.type,
    }),
    
    signIn : Joi.object({
        email : userSchema.email,
        pass : userSchema.pass,
    }),

    signOut : Joi.object({}),

} ;

module.exports = { userSchema, user };
