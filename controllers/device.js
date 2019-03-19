'use strict';

const VEvent = require('../models/vevent');
const VEventImage = require('../models/vevent_image');
const Device = require('../models/device');
const config = require('config');
var util = require('../lib/util');
var fs = require('fs');

// Libraries
var responseMessages = require('../lib/response-messages');

/* GET video event list */
module.exports.list = async (req, res, next) => {
    try {
        let deviceObj = new Device();
        let data = await deviceObj.getAll();
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", data);
        return res.status(200).json(response);
    }
    catch(error) {
        console.log(error);
       let response = responseMessages.commonResponse(responseMessages.FAIL);
       return res.status(500).json(response);
    }
}

