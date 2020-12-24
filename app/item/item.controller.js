const Item    = require( './item.model' ) ;
const respond = require( '../../response' ) ;
const fs = require( "fs" );

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
    let filter = {
        type:req.query.type,
        status:"a",
    }
    if( req.query.tag ) filter.tags = { $in : req.query.tag }
    console.log( filter );
    const itemDocs = await Item.find( 
       filter, { name:1, size_identifier_qty:1 } ).skip( req.query.pageNo*10 ).limit( 10 );
    
        return respond.ok( res, itemDocs );
}

module.exports.getImg = async ( req, res ) => {
    const imgPath = __dirname + `\\img\\${req.query.itemName}.png`;
    if ( fs.existsSync( imgPath ) )
        return res.sendFile( imgPath );
    else
        return respond.err( res, {err: respond.errData.resNotFound, info: `Image Not Found: ${req.query.itemName}` } );
}   