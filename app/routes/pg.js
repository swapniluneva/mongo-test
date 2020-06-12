const express = require('express'),
    router = express.Router();

const route = '/product';

const productController = require('../controllers/product');

const Util = require('../../lib/pgUtilities'),
    MW = require('../../lib/middlewares');

router.get(`/api${route}/:productId/users`, Util.parallel([MW.logRequest, MW.setDB]), productController.getUsers)


module.exports = router;