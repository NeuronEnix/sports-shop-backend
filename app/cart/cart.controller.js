const User = require( "mongoose").model( "users");
const Item = require("mongoose").model("items");
const Order = require( "mongoose" ).model("orders");
const respond = require( '../../response' ) ;

module.exports.addItem = async ( req, res ) => {
    const cartData  = req.body ;
    const userDoc = await User.findById( req.UserID, "cart" );
    userDoc.cart = cartData;
    await userDoc.save(); 
    return respond.ok( res );
}

module.exports.delItem = async ( req, res ) => {
    const userDoc = await User.findById( req.UserID, "cart" );
    userDoc.cart = [];
    await userDoc.save(); 
    return respond.ok( res );
}
module.exports.getItem = async ( req, res ) => {
    const userDoc = await User.findById( req.UserID, "cart" );
    const userCart = userDoc.cart ? userDoc.cart : {};
    return respond.ok( res, userCart );
    
}
module.exports.buyItem = async ( req, res ) => {
    const items = req.body;
    const itemDocsToBeSaved = []
    for( const itemKey of Object.keys( items ) ) {

        // get itemKey -> name of item and then get its detail from db
        const itemDoc = await Item.findOne( { name: itemKey }, {size_identifier_qty:1, name:1} );
        // iterate through the sizes items[itemKey] -> should give size as key
        for( const sizeKey of Object.keys( items[itemKey] ) ) {
            
            for( const identifierKey of Object.keys( items[itemKey][sizeKey] ) ) {

                // iterate through the identifiers items[itemKey][sizeKey] -> should give identifier as key
                const itemQty = parseInt( items[itemKey][sizeKey][identifierKey] );
                if( itemQty > itemDoc.size_identifier_qty[sizeKey][identifierKey] )
                    return respond.err( res, { 
                        err: respond.errData.notEnoughStock,
                        info: `Low Stock: ${itemKey}-${sizeKey}-${identifierKey}: avail(${itemDoc.size_identifier_qty[sizeKey][identifierKey]})`
                    });
                
                // Enough Qty is present 
                
                itemDoc.size_identifier_qty[sizeKey][identifierKey] = 
                parseInt(itemDoc.size_identifier_qty[sizeKey][identifierKey]) - 
                parseInt( items[itemKey][sizeKey][identifierKey] );
                
            }

        }
        // push to save later if everything goes well
        itemDocsToBeSaved.push( itemDoc );
    } // all stock check will be done, following lines saves after deducting qty

    itemDocsToBeSaved.forEach( async itemDoc => {
        itemDoc.markModified('size_identifier_qty');
        await itemDoc.save();
    })

    Order.CreateOrder( items, req.UserID );
    User.findByIdAndUpdate( req.UserID, {cart:{}} )
    return respond.ok( res );

}
