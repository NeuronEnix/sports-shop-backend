const router = require( 'express' ).Router() ;

const order = require( './order.controller' ) ;

router.post( '/add', order.add ) ;

router.get( '/get', order.get ) ;
router.get( '/detail', order.detail ) ;

module.exports.router = router;