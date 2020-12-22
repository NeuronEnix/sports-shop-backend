const router = require( 'express' ).Router() ;

const item = require( './item.controller' ) ;

router.post( '/add', item.add ) ;
router.get(  '/get', item.get ) ;

module.exports.router = router;