const mongoose = require( 'mongoose' ) ;

const errData  = require( '../../response.js' ).errData ;

var bannerSchema = new mongoose.Schema ({
    img : String,
    Status : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
});

const Banner = mongoose.model( 'banners', bannerSchema ) ;
module.exports = Banner;
