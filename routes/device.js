'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const config = require('config');

let DeviceController = require('../controllers/device');
let validator = require('../validators/message');

/* GET Event list */
router.get('/list', DeviceController.list);

module.exports = router;