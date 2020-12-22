const mongoose = require( 'mongoose' ) ;

const errData  = require( '../../response.js' ).errData ;

var itemSchema = new mongoose.Schema ({
    name : String,
    type : String,
    img: String,
    tag: [ String ],
    user_id : { type : mongoose.Schema.Types.ObjectId, required : true },
    status : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
});

const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item;
