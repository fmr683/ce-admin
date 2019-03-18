'use strict';

const express = require('express');
const router = express.Router();

let VEventController = require('../controllers/vevent');
let validator = require('../validators/message');

/* GET Event list */
router.get('/list', VEventController.list);

router.get('/detail/:id', VEventController.detail);

module.exports = router;