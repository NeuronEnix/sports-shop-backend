const { user }     = require( "./validations/user.val") ;
const { banner } = require("./validations/banner.val");
const respond = require( '../response' ) ;
const errData = respond.errData ;


const validate = async ( req, res, next, schema ) => {
    try { 

        let dataToBeValidated ;
        if ( req.method === "GET" ) dataToBeValidated = req.query ;
        else                        dataToBeValidated = req.body  ;

        await schema.validateAsync( dataToBeValidated ) ; 
        return next() ;

    } catch ( err ) { 
        const validationErr =  { err : errData.validationErr, info : err.details[0].message } ;
        respond.err( res, validationErr ) ;
    }
} ;

const validator = {

    user : {
        signUp  : ( req, res, next ) => { validate( req, res, next, user.signUp  ) },
        signIn  : ( req, res, next ) => { validate( req, res, next, user.signIn  ) },
        signOut : ( req, res, next ) => { validate( req, res, next, user.signOut ) },
    }, 

    banner : {
        add : ( req, res, next ) => { validate( req, res, next, banner.add ) },
        get : ( req, res, next ) => { validate( req, res, next, banner.get ) },
    },

    item : {
        add : ( req, res, next ) => { validate( req, res, next, item.add ) },
        get : ( req, res, next ) => { validate( req, res, next, item.get ) },
    },

    order : {
        add    : ( req, res, next ) => { validate( req, res, next, order.add ) },
        get    : ( req, res, next ) => { validate( req, res, next, order.get ) },
        detail : ( req, res, next ) => { validate( req, res, next, order.get ) },
    },
    
}

module.exports = { validator };