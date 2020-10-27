const express = require('express'),
    router = express.Router();

const route = '/data';

const dataController = require('../controllers/data');

const Util = require('../../lib/pgUtilities'),
    MW = require('../../lib/middlewares');

router.post(`/api${route}/addData`, Util.parallel([MW.logRequest, MW.setDB]), dataController.addData)
router.get(`/api${route}/getData`, Util.parallel([MW.logRequest, MW.setDB]), dataController.getData)
router.get(`/api${route}/getQRCode`, Util.parallel([MW.logRequest, MW.setDB]), dataController.getQRCode)


module.exports = router;