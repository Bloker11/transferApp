import {deposit, withdraw, fullSend, getMyTransactions } from '../controllers/transController.js'
import express from "express";

const router = express.Router();

router.route('/deposit')
    .post(deposit)
router.route('/withdrawal/:difference')
    .get(withdraw)
router.route('/send')
    .post(fullSend)
router.route('/m/:id')
    .get(getMyTransactions)

export default router;