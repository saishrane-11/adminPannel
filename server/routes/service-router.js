const service = require('../controllers/service-controller')
const express = require('express');
const router = express.Router();
router.route('/service').get(service);

module.exports = router;