const mongoose = require( 'mongoose' ) ;

const { DB } = require( './server.config' ).CONFIG

//Fixes all deprecation warnings
mongoose.set( 'useNewUrlParser'    , true  ) ;
mongoose.set( 'useFindAndModify'   , false ) ;
mongoose.set( 'useCreateIndex'     , true  ) ;
mongoose.set( 'useUnifiedTopology' , true  ) ;
mongoose.set( 'autoIndex'          , true  ) ;

// Importing schema 
require( './app/item/item.model' ) ;
require( './app/order/order.model.js' ) ;
require( './app/user/user.model.js' ) ;

// Connects to DB
module.exports.connect = () => {
    mongoose.connect( DB.URL ) 
        .then  ( val => { console.log('Connected to DB')     ; } )
        .catch ( err => { console.log('Not Connected to DB') ; } ) ;
}
