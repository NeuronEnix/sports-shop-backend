const router = require( 'express' ).Router() ;

const order = require( './order.controller' ) ;

router.get( '/get', order.get ) ;

router.post( '/cancel', order.cancel ) ;
router.post( '/update', order.update ) ;

module.exports.router = router;