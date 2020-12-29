const router = require( 'express' ).Router() ;
const multer = require( "multer" );
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if( file.fieldname == "img") cb(null, "./app/item/img/" );
        else cb(null, "./app/item/logo/" );
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
   
var upload = multer( {
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 },// fileSize: 10MB (limit)
    fileFilter: fileFilter
 } ) ; 

const item = require( './item.controller' ) ;
const uploader = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'logo', maxCount: 1 }])
router.post( '/add', uploader, item.addItem ) ;

router.get( '/list'    , item.listItem   ) ;
router.get( '/detail'  , item.detail     ) ;
router.get( '/img-link', item.getImgLink ) ;


module.exports.router = router;