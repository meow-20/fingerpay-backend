// Define Express routes

const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');
const paymentController = require('../controllers/paymentController');

router.post('/enroll', enrollmentController.enrollUser);
router.post('/pay', paymentController.payUser);

module.exports = router;
