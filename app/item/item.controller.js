const Item    = require( './item.model' ) ;
const respond = require( '../../response' ) ;
const fs = require( "fs" );

module.exports.addItem = async ( req, res ) => {
    if( !req.files )
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
       filter, { _id:0, name:1, size_identifier_qty:1 } ).sort({name:1}).skip( req.query.pageNo*10 ).limit( 10 );
    
        return respond.ok( res, itemDocs );
}

module.exports.getImgLink = async ( req, res ) => {
    const itemName = req.query.name;
    const imgPath = __dirname + "\\img\\" + itemName + ".png";
    
    if( fs.existsSync( imgPath ))
        return respond.ok( res, `${req.connection.localAddress}:${req.connection.localPort}/item/img/${itemName}.png` )   ;
    return respond.err( res, { err: respond.errData.resNotFound } );
}

module.exports.detail = async ( req, res ) => {
    const itemName = req.query.name;
    
    const itemDetail = await Item.findOne( 
        { name:itemName, status:'a' },
        { _id:0, size_identifier_qty:1 }
    );

    return respond.ok( res, itemDetail );
}