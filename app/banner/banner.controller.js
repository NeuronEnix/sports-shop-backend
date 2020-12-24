const respond = require( '../../response' ) ;
const fs = require( "fs" );
module.exports.add = async ( req, res ) => {
    if( !req.file )
        return respond.err( res, { err: respond.errData.dbCommitErr, info: "Supports only .png images"} );
    return respond.ok( res );
}

module.exports.list = async ( req, res, next ) => {
    const imgDir = __dirname + "\\img";
    const imgs = fs.readdirSync( imgDir );
    
    respond.ok( res, imgs.map( img => {
        return `${req.connection.localAddress}:${req.connection.localPort}/banner/img/${img}`;
    } ))

}

