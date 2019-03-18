'use strict';

const VEvent = require('../models/vevent');
const config = require('config');

// Libraries
var responseMessages = require('../lib/response-messages');

/* GET video event list */
module.exports.list = async (req, res, next) => {
    let data = {};
    try {
        let vEventObj = new VEvent();
        let data = await vEventObj.getAll();
        res.render('list', { data: data});
       // let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", data);
       // return res.status(200).json(response);
    }
    catch(error) {
      //  console.log(error);
       // let response = responseMessages.commonResponse(responseMessages.FAIL);
       // return res.status(500).json(response);
       res.render('list', { data: ''});
    }
}

/* GET video detail list */
module.exports.detail = async (req, res, next) => {
    let data = {};
    try {
        let vEventObj = new VEvent();
        let data = await vEventObj.getById(req.params);
       // let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", data);
       // return res.status(200).json(response);
       res.render('detail', { data: data});
    }
    catch(error) {
       // let response = responseMessages.commonResponse(responseMessages.FAIL);
       // return res.status(500).json(response);
       res.render('detail', { data: ''});
    }
};