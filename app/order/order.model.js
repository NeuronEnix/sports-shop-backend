const mongoose = require( 'mongoose' ) ;
const Item = require( "mongoose").model( "items" );
const errData  = require( '../../response.js' ).errData ;

var orderSchema = new mongoose.Schema ({
    items : {},
    pin : String,
    address: String,
    city: String,
    user_id : { type : mongoose.Schema.Types.ObjectId, required : true },
    status : { type : Number, default :0 },     // 'a' -> active ; 'd' -> disabled
});

orderSchema.statics.CreateOrder = async ( orderDetails = {}, user_id ) => {
    const orderDoc = new Order();
    orderDoc.user_id = user_id;
    Object.assign( orderDoc, orderDetails)
    orderDoc.save();
}


const Order = mongoose.model( 'orders', orderSchema ) ;
module.exports = Order;
