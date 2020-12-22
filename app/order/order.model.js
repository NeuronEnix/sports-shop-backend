const mongoose = require( 'mongoose' ) ;

const errData  = require( '../../response.js' ).errData ;

var orderSchema = new mongoose.Schema ({
    orders : [ {
            order_id:{ type : mongoose.Schema.Types.ObjectId, required : true },
            detail: {}
        } ],
    user_id : { type : mongoose.Schema.Types.ObjectId, required : true },
    status : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
});

const Order = mongoose.model( 'orders', orderSchema ) ;
module.exports = Order;
