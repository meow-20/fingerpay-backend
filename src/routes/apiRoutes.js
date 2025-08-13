// Define Express routes

const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');
const paymentController = require('../controllers/paymentController');
const bankController = require('../controllers/bankController');
const walletController = require('../controllers/walletController');

router.post('/enroll', enrollmentController.enrollUser);
router.post('/pay', paymentController.payUser);
router.post("/link-bank", bankController.linkBank);
router.post("/wallet/topup", walletController.topUpWallet);
router.get("/wallet/balance", walletController.getWalletBalance);

module.exports = router;
