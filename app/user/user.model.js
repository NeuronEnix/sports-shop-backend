const bcrypt   = require( 'bcryptjs' ) ;
const mongoose = require( 'mongoose' ) ;

const errData  = require( '../../response.js' ).errData ;
const { BCRYPT } = require( '../../server.config').CONFIG ;

var userSchema = new mongoose.Schema ({
    email : { type : String, index: { unique: true } },
    pass : String,
    name : String,
    ts : Date, // RefreshToken creation time
    cart : {},
    contact:String,
    type : { type : String, default: 'e' },     // 'a' -> admin  ; 'e' -> employee
    status : { type : String, default :'a' },     // 'a' -> active ; 'd' -> disabled
});

userSchema.statics.AddNewUser = async ( userData ) => {
    try {
        const user = new User() ;
        userData.pass = await bcrypt.hash( userData.pass, BCRYPT.ROUNDS ) ;
        Object.assign( user, userData ) ;
        return await user.save() ;
    } catch ( err ) {
        if ( err.code === 11000 )
            throw { err : errData.duplicateErr, info : 'email Already Exist' };
        throw err ;
    }
}

userSchema.statics.SignIn = async ( { email, pass } ) => {
    const user = await User.findOne( { email } , { pass:1, type:1 } ) ;
    if ( user ) {
        const passMatched = await bcrypt.compare( pass, user.pass ) ;
        if ( passMatched ) {
            user.TS = Date.now() ;
            return await user.save() ;
        }
    }
    throw { err : errData.invalidCredential, info : 'email or pass is Incorrect!' } ;
}

const User = mongoose.model( 'users', userSchema ) ;
module.exports = User;
