const Item = require("./item.model");
const respond = require("../../response");
const fs = require("fs");

module.exports.addItem = async (req, res) => {
    const itemData = { ...req.body, ...{ user_id: req.UserID } };
    // console.log( { itemData })
    // if( !req.files )
    //     return respond.err( res, { err: respond.errData.dbCommitErr, info: "Supports only .png images"} );
    const newItem = new Item();
    Object.assign(newItem, itemData);
    try {
        await newItem.save();
        return respond.ok(res);
    } catch (err) {
        return respond.err(res, { err: respond.errData.duplicateErr, info: "Already Exist: " + itemData.name });
    }
};

module.exports.listItem = async (req, res) => {
    const itemDocs = await Item.find({ status: "a" }, { _id: 0, __v: 0, status: 0, user_id: 0 }).sort({ _id: 1 });
    return respond.ok(res, itemDocs);
};

module.exports.getImgLink = async (req, res) => {
    const itemName = req.query.name;
    const imgPath = __dirname + "\\img\\" + itemName + ".png";

    if (fs.existsSync(imgPath)) return respond.ok(res, `${req.connection.localAddress}:${req.connection.localPort}/item/img/${itemName}.png`);
    return respond.err(res, { err: respond.errData.resNotFound });
};

module.exports.detail = async (req, res) => {
    const itemName = req.query.name;

    const itemDetail = await Item.findOne({ name: itemName, status: "a" }, { _id: 0, size_identifier_qty: 1 });

    return respond.ok(res, itemDetail);
};
