'use strict';

const express = require('express');
const router = express.Router();

let messageController = require('../controllers/message');
let validator = require('../validators/message');

/* POST Insert seller message to buyer */
router.post('/seller/:buyer_id', validator.messageValidation, messageController.insertSellerMessage);

/* GET Get all seller messages */
router.get('/seller/', messageController.getAllSellerMessage);

/* GET Get all seller messages with buyer */
router.get('/seller/:buyer_id', messageController.getDetailMessage);


/* POST Insert buyer message to seller */
router.post('/buyer/:seller_id', validator.messageValidation, messageController.insertBuyerMessage);

/* GET Get all buyer messages */
router.get('/buyer/', messageController.getAllBuyerMessage);

/* GET Get all buyer messages with seller */
router.get('/buyer/:seller_id', messageController.getBuyerDetailMessage);


module.exports = router;
