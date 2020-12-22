const { item }     = require( "./validations/item.val") ;
const { sale }     = require( "./validations/sale.val") ;
const { user }     = require( "./validations/user.val") ;
const { seller }   = require( "./validations/seller.val") ;
const { purchase } = require( "./validations/purchase.val") ;

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
        signUp  : ( req, res, next ) => { validate( req, res, next, user.signUP  ) },
        signIn  : ( req, res, next ) => { validate( req, res, next, user.signIn  ) },
        signOut : ( req, res, next ) => { validate( req, res, next, user.signOut ) },
    }, 

}

module.exports = { validator };