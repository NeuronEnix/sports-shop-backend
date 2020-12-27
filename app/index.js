const router = require( 'express' ).Router() ;

const user = require( './user/user.router.js' ) ;
router.use( '/user', user.router ) ;

const banner = require( './banner/banner.router.js' ) ;
router.use( '/banner', banner.router ) ;

const item = require("./item/item.router")
router.use( '/item', item.router ) ;

const cart = require("./cart/cart.router")
router.use( '/cart', cart.router ) ;

const order = require("./order/order.router")
router.use( '/order', order.router ) ;

module.exports.router = router ;