import Transaction from '../models/Transaction.js'
import {deposit, withdraw, send } from '../controllers/transController.js'
import express from "express";

const router = express.Router();

router.route('/deposit').post()
router.route('/withdrawal').get()
router.route('/send').post()

export default router;
