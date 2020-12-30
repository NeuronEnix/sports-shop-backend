const Order    = require( './order.model' ) ;
const respond = require( '../../response' ) ;
const { response } = require('express');

module.exports.get = async( req, res) => {
    const user_id = req.UserID;

    const orderDoc = await Order.find( { user_id }, {user_id:0, __v:0, } ).sort({_id:-1});
    return respond.ok( res, orderDoc)
}
module.exports.update = async( req, res) => {
    const order_id = req.body.order_id
    const orderDoc = await Order.findById( order_id, {user_id:0, __v:0, } );
    if( orderDoc.status == -1 || orderDoc.status >= 3 )
        return respond.err( res, { err: respond.errData.unAuthorized, info: "Item is either canceled or delivered"} )
    orderDoc.status += 1;
    orderDoc.markModified('status');
    await orderDoc.save();
    return respond.ok( res, orderDoc  );
}

module.exports.cancel = async( req, res) => {
    const order_id = req.body.order_id;
    
    const orderDoc = await Order.findById( order_id , {user_id:0, __v:0, } );
    if( !orderDoc ) return respond.err( res, { err: respond.errData.resNotFound , info: "Order Not Found"} );
    if( orderDoc.status == -1 || orderDoc.status >= 3 )
        return respond.err( res, { err: respond.errData.unAuthorized, info: "Item is either canceled or delivered"} )
    orderDoc.status = -1;
    orderDoc.markModified('status');
    await orderDoc.save();
    return respond.ok( res, orderDoc  )
}
