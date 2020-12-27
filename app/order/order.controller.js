const Order    = require( './order.model' ) ;
const respond = require( '../../response' ) ;

module.exports.get = async( req, res) => {
    const { pageNo } = req.query;
    const user_id = req.UserID;

    const orderDoc = await Order.find( { user_id }, {user_id:0, __v:0, _id:0} ).sort({_id:1}).skip( pageNo*10).limit( 10 );
    return respond.ok( res, orderDoc)
}

