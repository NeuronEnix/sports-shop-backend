const Order    = require( './order.model' ) ;
const moment = require("moment");
const respond = require( '../../response' ) ;

module.exports.get = async( req, res) => {
    const user_id = req.UserID;

    const orderDocs = await Order.find( { user_id }, {user_id:0, __v:0,  } ).sort({_id:-1});
    const now = moment();
    orderDocs.forEach( async orderDoc => {
        if( orderDoc.status > -1 && orderDoc.status < 3 && moment( orderDoc.statusUpdateDates[ orderDoc.status ] ).isBefore( now )  ) {
            while( orderDoc.status <= 2 && moment( orderDoc.statusUpdateDates[ orderDoc.status ] ).isBefore( now ) ) {
                orderDoc.status += 1;
            }
            orderDoc.markModified('status');
            await orderDoc.save();
        }
    })
    
    return respond.ok( res, orderDocs)
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
