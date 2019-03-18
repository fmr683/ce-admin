'use strict';

const Message = require('../models/message');
const config = require('config');

// Libraries
var responseMessages = require('../lib/response-messages');

/* POST Seller Insert Message */
module.exports.insertSellerMessage = async (req, res, next) => {

   req.body.seller_id = 3; // need to replace with JWT auth id
   req.body.buyer_id = req.params.buyer_id;

   try {

        let message = new Message();
        let data = await message.createMessage(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data.insertId });
        return res.status(200).json(response);
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
    }
}

/* GET All sellers messages */
module.exports.getAllSellerMessage = async (req, res, next) => {

    req.body.seller_id = 40; // need to replace with JWT auth id

    try {
        req.body.offset = (req.query.offset ? +req.query.offset : 0);
        let message = new Message();
        let dataCount = await message.getAllSellerMessagesCount(req.body);
        
        if (dataCount[0].count == 0) { // No data
            let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND, "", "");
            return res.status(404).json(response);
        }

        let data = await message.getAllSellerMessages(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data, 'totalCount': dataCount[0].count});
        return res.status(200).json(response);
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
     }
}


/* GET All sellers messages with buyer */
module.exports.getDetailMessage = async (req, res, next) => {

    req.body.seller_id = 40; // need to replace with JWT auth id
    req.body.buyer_id = req.params.buyer_id;
    try {
        req.body.offset = (req.query.offset ? +req.query.offset : 0);
        let message = new Message();
        let dataCount = await message.getDetailMessageCount(req.body);
        
        if (dataCount[0].count == 0) { // No data
            let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND, "", "");
            return res.status(404).json(response);
        }

        let data = await message.getDetailMessage(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data, 'totalCount': dataCount[0].count});
        return res.status(200).json(response);
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
     }
}



/* POST Buyer Insert Message */
module.exports.insertBuyerMessage = async (req, res, next) => {

    req.body.buyer_id = 3; // need to replace with JWT auth id
    req.body.seller_id = req.params.seller_id;
 
    try {
 
        let message = new Message();
        let data = await message.createMessage(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data.insertId });
        return res.status(200).json(response);
     }
     catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
     }
 }
 
 /* GET All Buyers messages */
 module.exports.getAllBuyerMessage = async (req, res, next) => {
 
     req.body.buyer_id = 55; // need to replace with JWT auth id
 
     try {
        req.body.offset = (req.query.offset ? +req.query.offset : 0);
        let message = new Message();
        let dataCount = await message.getAllBuyerMessagesCount(req.body);
         
        if (dataCount[0].count == 0) { // No data
            let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND, "", "");
            return res.status(404).json(response);
        }
 
        let data = await message.getAllBuyerMessages(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data, 'totalCount': dataCount[0].count});
        return res.status(200).json(response);
     }
     catch(error) {
         console.log(error);
         let response = responseMessages.commonResponse(responseMessages.FAIL);
         return res.status(500).json(response);
      }
 }
 
 
 /* GET All Buyer messages with seller */
 module.exports.getBuyerDetailMessage = async (req, res, next) => {
 
    req.body.buyer_id = 55; // need to replace with JWT auth id
    req.body.seller_id = req.params.seller_id;
    try {
        req.body.offset = (req.query.offset ? +req.query.offset : 0);
        let message = new Message();
        let dataCount = await message.getDetailMessageCount(req.body);
         
        if (dataCount[0].count == 0) { // No data
            let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND, "", "");
            return res.status(404).json(response);
        }
 
        let data = await message.getDetailMessage(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'message': data, 'totalCount': dataCount[0].count});
        return res.status(200).json(response);
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
    }
 }