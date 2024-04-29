/* nodeRoutes.js */

require('dotenv').config();

const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/nodeController');

router.get('/nodes', nodeController.getNodes);

module.exports = router;
