const router = require( 'express' ).Router() ;

const cart = require( './cart.controller' ) ;

router.post( '/item', cart.addItem ) ;
router.post( '/buy', cart.buyItem ) ;

router.get( '/item', cart.getItem ) ;

module.exports.router = router;