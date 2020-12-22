const router = require( 'express' ).Router() ;

const banner = require( './banner.controller' ) ;
const { validator } = require( "../../middleware/validator" ) ;

router.post( '/add', validator.banner.add, banner.add ) ;

router.get( '/get', validator.banner.get, banner.get ) ;

module.exports.router = router;