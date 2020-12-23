const Banner    = require( './banner.model' ) ;
const respond = require( '../../response' ) ;

module.exports.add = async ( req, res ) => {
    const bannerData  = req.body ;
    const banner = new Banner();
    Object.assign( banner, bannerData );
    await banner.save();
    return respond.ok( res );

}

module.exports.get = async ( req, res, next ) => {
    const { pageNo } = req.body;
    const bannerDoc = await Banner.find( { status: 'a' }, { _id:0, img: 1 } )
                                    .sort({_id:-1})
                                    .skip( pageNo*5)
                                    .limit(5);
    respond.ok( res, bannerDoc ) ;
    return next() ;

}

