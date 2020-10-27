const db = require('../../lib/base.db'),
    utils = require('../../lib/utilities'),
    qrcode = require('qrcode'),
    ObjectId = require('mongodb').ObjectID,
    collectionName = 'clientData';

const addData = async(req, res, next) => {
    try {
        const coll = db(collectionName);
        const clientData = req.body;
        const result = await coll.insertOne(req.conn, { clientData }, {})
            // console.log('insertedId', result);
        return utils.sendData(req, res, result.insertedId);
    } catch (err) {
        return utils.sendError(req, res, 'Something went wrong', err)
    }

}

const getData = async(req, res, next) => {
    try {
        const coll = db(collectionName);
        const eId = req.query.eId;
        const result = await coll.findOne(req.conn, { _id: ObjectId(eId) })
            // console.log(eId, result);
        return utils.sendData(req, res, result);
    } catch (err) {
        return utils.sendError(req, res, 'Something went wrong', err)
    }

}

const getQRCode = async(req, res, next) => {
    try {
        const eId = req.query.eId;
        qrcode.toBuffer(eId, {}, function(err, data) {
            if (err) {
                console.log("QR code generation failed----------", err);
                utils.sendError(req, res, "QR code generation failed", error);
                return;
            }
            res.status(200);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename=barcode.png'
            });
            res.send(data);
        });
    } catch (err) {
        return utils.sendError(req, res, 'Something went wrong', err)
    }

}

module.exports = {
    addData,
    getData,
    getQRCode
}