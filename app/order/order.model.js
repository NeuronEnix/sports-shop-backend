const mongoose = require( 'mongoose' ) ;
const moment = require( "moment" ) ;

const Item = require( "mongoose").model( "items" );
const errData  = require( '../../response.js' ).errData ;

var orderSchema = new mongoose.Schema ({
    items : {},
    pin : String,
    address: String,
    city: String,
    statusUpdateDates:[Date],
    user_id : { type : mongoose.Schema.Types.ObjectId, required : true },
    status : { type : Number, default :0 },     // 'a' -> active ; 'd' -> disabled
},
{ timestamps: { createdAt:'created_at', updatedAt: 'updated_at'} }
);

orderSchema.statics.CreateOrder = async ( orderDetails = {}, user_id ) => {
    const orderDoc = new Order();
    const dates = getDates();;
    console.log( dates )
    orderDoc.statusUpdateDates = dates;
    orderDoc.user_id = user_id;
    Object.assign( orderDoc, orderDetails)
    orderDoc.save();
}


const Order = mongoose.model( 'orders', orderSchema ) ;
module.exports = Order;

function getDates() {
    let maxDays = 10;
    const dates = [];
    const curDate = moment();
    for( let i=0; i<3; ++i ) {
        maxDays = Math.floor( Math.random() * maxDays )
        console.log( maxDays );
        dates.push( curDate.add( maxDays, 'd' ).clone() );
    }
    return dates;    
}