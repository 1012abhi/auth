import { Router } from 'express';
import { checkout, paymentVerification, getKey } from '../controller/payment.controller.js';

const router = Router();

router.post('/checkout', checkout)
router.post('/paymentverification', paymentVerification)
router.get('/getkey', getKey)

export default router;