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
        let vEventImageObj = new VEventImage();
        let mediaData = await vEventImageObj.getEventId(req.params);
       // let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", data);
       // return res.status(200).json(response);
       console.log(mediaData);
       res.render('detail', { data: data, mediaData: mediaData});
    }
    catch(error) {
       // let response = responseMessages.commonResponse(responseMessages.FAIL);
       // return res.status(500).json(response);
       res.render('detail', { data: ''});
    }
};


/* POST create video  */
module.exports.create = async (req, res, next) => {
    let data = {};
    try {

        let deviceObj = new Device();
        let deviceData = await deviceObj.getById(req.body);

        if (deviceData[0] === undefined) {
            let response = responseMessages.commonResponse(responseMessages.NOT_FOUND);
            return res.status(404).json(response);
        }

        let device_no = deviceData[0].device_no;

        let uploadedFiles = [];
        let dateTimeFolder = Date.now();

        req.files.forEach(async (data, index) => {
            
            let videoTypes = util.videoTypes();
            let orgName = req.files[index].originalname.toLowerCase();

            var origFileName = orgName.split('.');

            let tmpPath = req.files[index].path;
            let filePath = '/'+ device_no + '/' + dateTimeFolder + '/' + origFileName[0].replace(/ /g,'_') + '.' + origFileName[1];
            uploadedFiles.push(filePath);
            let permanentPath = config.get('thumbnail')  + filePath;

            let directory_lv1 = config.get('thumbnail')  + '/'+ device_no + '/' ;
            let directory_lv2 = config.get('thumbnail')  + '/'+ device_no + '/' + dateTimeFolder

            if (videoTypes.includes(req.files[index].mimetype)) { // move the video file to directory 
                if (util.mkdirpath(directory_lv1)) {
                    if (util.mkdirpath(directory_lv2)) {
                        fs.renameSync(tmpPath, permanentPath);
                    }
                } 
            }
        });

        let vEventObj = new VEvent();
        let data = await vEventObj.create(req.body);

        let vEventImageObj = new VEventImage();
        uploadedFiles.forEach(async (image_data, index) => {
            vEventImageObj.create({ event_id: data.insertId, image: image_data });
        });

        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data.insertId });
        return res.status(200).json(response);
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
        // res.render('detail', { data: ''});
    }
};


