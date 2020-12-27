const mongoose = require( 'mongoose' ) ;
const Item = require( "mongoose").model( "items" );
const errData  = require( '../../response.js' ).errData ;

var orderSchema = new mongoose.Schema ({
    items : {},
    user_id : { type : mongoose.Schema.Types.ObjectId, required : true },
    status : { type : Number, default :0 },     // 'a' -> active ; 'd' -> disabled
});

orderSchema.statics.CreateOrder = async ( items = [] , user_id ) => {
    const orderDoc = new Order();
    orderDoc.user_id = user_id;
    orderDoc.items = items;
    orderDoc.save();
}


const Order = mongoose.model( 'orders', orderSchema ) ;
module.exports = Order;
