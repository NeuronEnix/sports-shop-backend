const router = require( 'express' ).Router() ;

const user = require( './user.controller' ) ;
const { validator } = require( "../../middleware/validator" ) ;

router.post( '/sign-up'   , user.signUp  ) ;
router.post( '/sign-in'   , user.signIn  ) ;
router.get ( '/sign-out' , user.signOut ) ;

module.exports.router = router