const router = require( 'express' ).Router() ;

const order = require( './order.controller' ) ;

router.get( '/get', order.get ) ;
// router.get( '/detail', order.detail ) ;

module.exports.router = router;