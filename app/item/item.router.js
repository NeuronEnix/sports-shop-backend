const router = require( 'express' ).Router() ;
const multer = require( "multer" );
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./app/item/img/" );
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + "." + file.mimetype.split("/")[1] );
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

const item = require( './item.controller' ) ;

router.post( '/add', upload.single( "img" ), item.addItem ) ;

router.get(  '/list', item.listItem ) ;


module.exports.router = router;