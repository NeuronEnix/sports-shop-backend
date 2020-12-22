const Banner    = require( './banner.model' ) ;
const respond = require( '../../response' ) ;

module.exports.add = async ( req, res ) => {
    const bannerData  = req.body ;
}

module.exports.get = async ( req, res, next ) => {
    const { pageNo } = req.body;
    const bannerDoc = await Banner.find({status:'a'})
                                    .sort({_id:-1})
                                    .skip( pageNo*5)
                                    .limit(5);
    respond.ok( res, bannerDoc ) ;
    return next() ;

}

