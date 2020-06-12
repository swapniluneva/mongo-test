const _ = require('lodash')

exports.isVoid = function (obj) {
    switch (typeof (obj)) {
        case "undefined":
        case "object":
            for (var x in obj) {
                if (obj.hasOwnProperty(x))
                    return false;
                else
                    return true;
            }
            return true;
        case "number":
        case "boolean":
            return false;
        case "string":
            if (obj.trim() === '')
                return true;
            else
                return false;
        default:
            return false;
    }
};

function extractId(arId) {
    var lastIndexOfSlash = arId.lastIndexOf("/");
    return arId.substring(lastIndexOfSlash + 1);
}

module.exports.extractId = extractId;


exports.getReqParams = function (params, src) {
    var objToBeRet = {
        mandateData: {},
        optionalData: {},
        missing: []
    };

    params.mandateKeys && params.mandateKeys.forEach(function (param) {
        exports.isVoid(src[param])
            ? objToBeRet.missing.push(param)
            : objToBeRet.mandateData[param] = src[param];
    });
    params.optionalKeys && params.optionalKeys.forEach(function (param) {
        if (exports.isVoid(objToBeRet.mandateData[param]))
            objToBeRet.optionalData[param] = exports.isVoid(src[param]) ? '' : src[param];
    });

    return objToBeRet;
};

exports.sendData = function (req, res, data) {
    return res.status(200).json({
        success: true,
        data: data
    });
};

exports.sendWrongInputError = function (req, res, message, message_alias) {
    return res.status(400).json({
        success: false,
        message: message,
        message_alias: message_alias
    });
};

exports.sendUnauthorized = function (req, res, message, message_alias) {
    return res.status(401).json({
        success: false,
        message: message,
        message_alias: 'Unauthorized'
    });
};

exports.sendInvalidCredentials = function (req, res) {
    return res.status(403).json({
        success: false,
        message: 'Invalid Credentials',
        message_alias: 'Unauthorized'
    });
};

exports.sendError = function (req, res, prettyMsg, err) {
    return res.status(400).json({
        success: false,
        message: err.toString(),
        prettyMsg: prettyMsg,
        error: err.stack
    });
};


exports.customPromiseReject = function (prettyMsg, msg, statusCode) {
    return Promise.reject({
        status: statusCode || 400,
        prettyMsg: prettyMsg,
        message: msg || prettyMsg
    });
}

exports.customPromiseCatchHandler = (req, res, err, genericErrorMessage) => {
    switch (err.status) {
        case 400: return exports.sendWrongInputError(
            req, res, err.message, err.prettyMsg);
        default: return exports.sendError(
            req, res, genericErrorMessage, err);
    }
}

exports.getRandomString = (length, prefix) => {
    var toBeReturn = prefix || '';
    return toBeReturn + Number((Math.random()).toString().substr(2)).toString(36).substr(1,3).toUpperCase();
}

exports.replaceValue = (_inputString, params) => {
    if(_inputString && typeof _inputString == "string" && _.isObject(params) && !_.isEmpty(params)) {
        for (var key in params) {
            _inputString = _inputString.replace(new RegExp("\\${"+key+"}", "g"), params[key]);
        }
    }
    return _inputString;
}
