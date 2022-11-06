import {deposit, withdraw, fullSend } from '../controllers/transController.js'
import express from "express";

const router = express.Router();

router.route('/deposit')
    .post(deposit)
router.route('/withdrawal')
    .get(withdraw)
router.route('/send')
    .post(fullSend)

export default router;
