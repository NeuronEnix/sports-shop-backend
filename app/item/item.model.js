const mongoose = require( 'mongoose' ) ;

const errData  = require( '../../response.js' ).errData ;

var itemSchema = new mongoose.Schema ({
    name : {type:String, unique:true},
    type : String,
    tags: [ String ],
    size_identifier_qty: {},
    user_id : { type : mongoose.Schema.Types.ObjectId, required : true },
    status : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
});

const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item;
