const Joi = require( '@hapi/joi' ) ;
const { commonSchema } = require("./common.val");
const bannerSchema = {
    img : Joi.string().trim().min( 1 ).max( 50 ).required(),
    page
} ;

const banner = {

    add : Joi.object({
        img : bannerSchema.img,
    }),
    
    get : Joi.object({
        pageNo: commonSchema.pageNo,
    }),

} ;

module.exports = { bannerSchema, banner };
