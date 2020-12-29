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
    const items = req.body.items;
    const itemDocsToBeSaved = []
    /*
    Format
    items = {
        "Shoe 1" : { "2": 3, "5": 2 },
        "Shoe 0": { "1": 10, "7": 12 },
        "Shoe 2": { "20": 20, "23": 1 }
    }
    */
    for( const itemKey of Object.keys( items ) ) {

        // get itemKey -> name of item and then get its detail from db
        const itemDoc = await Item.findOne( { name: itemKey }, {size_qty:1, name:1 } );

        // if item not found
        if( !itemDoc ) return respond.err( res, { err: respond.errData.resNotFound, info: `Item not available: ${itemKey}` } );

        // iterate through the sizes items[itemKey] -> should give size as key
        for( const sizeKey of Object.keys( items[itemKey] ) ) {
            if( !itemDoc.size_qty[ sizeKey ] ) return respond.err( res, { err: respond.errData.resNotFound, info: `Item size not available: ${itemKey}` } );
            
            // items[itemKey] -> should give qty
            const itemQty = parseInt( items[itemKey][sizeKey] );
            if( itemQty > itemDoc.size_qty[sizeKey] )
                return respond.err( res, { 
                    err: respond.errData.notEnoughStock,
                    info: `Low Stock: ${itemKey}-${sizeKey}: avail(${itemDoc.size_qty[sizeKey]})`
                });
            
            // Enough Qty is present 
            
            itemDoc.size_qty[sizeKey] = 
            parseInt(itemDoc.size_qty[sizeKey]) - 
            parseInt( items[itemKey][sizeKey] );
                
        }
        // push to save later if everything goes well
        itemDocsToBeSaved.push( itemDoc );
    } // all stock check will be done, following lines saves after deducting qty

    itemDocsToBeSaved.forEach( async itemDoc => {
        itemDoc.markModified('size_qty');
        await itemDoc.save();
    })

    Order.CreateOrder( req.body, req.UserID );
    User.findByIdAndUpdate( req.UserID, {cart:{}} )
    return respond.ok( res );

}
