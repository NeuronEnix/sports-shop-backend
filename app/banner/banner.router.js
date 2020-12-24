const router = require( 'express' ).Router() ;
const fs = require( "fs" );
const multer = require( "multer" );
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./app/banner/img/" );
    },
    filename: function (req, file, cb) {
        const imgDir = __dirname + "\\img";
        cb(null, `banner${fs.readdirSync( imgDir ).length}.${file.mimetype.split("/")[1]}` );
    }
  });

const fileFilter = ( req, file, cb ) => {
    if( file.mimetype === 'image/png' ) 
        return cb( null, true );
    return cb( null, false );
}
   
var upload = multer({
    storage: storage,
    limits:{ fileSize: 1024 * 1024 * 10 },// fileSize: 10MB (limit)
    fileFilter: fileFilter
 }); 

const banner = require( './banner.controller' ) ;

router.post( '/add', upload.single( "img" ), banner.add ) ;

router.get( '/list', banner.list ) ;

module.exports.router = router;