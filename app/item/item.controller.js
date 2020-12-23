const Item    = require( './item.model' ) ;
const respond = require( '../../response' ) ;

module.exports.addItem = async ( req, res ) => {
    if( !req.file )
        return respond.err( res, { err: respond.errData.dbCommitErr, info: "Supports only .png images"} );
    const itemData  = { ...req.body, ...{ user_id:req.UserID } } ;
    const newItem = new Item();
    Object.assign( newItem, itemData );
    try {

        await newItem.save();
        return respond.ok( res );

    } catch ( err ) {
        return respond.err( res, {err:respond.errData.duplicateErr, info: "Already Exist: " + itemData.name } );
    }
}


module.exports.listItem = async( req, res) => {
    const itemType = req.query.type;
    const tags = req.query.tag;
    
}