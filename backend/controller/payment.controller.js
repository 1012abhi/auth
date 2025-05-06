import instance from "../utils/razorpayInstance.js";
import { paymentModel } from "../models/payment.model.js";
import crypto from "crypto";

const checkout = async (req, res, next) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

const paymentVerification = async (req, res, next) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_API_SECRET;
    try {
        const generated_signature = crypto.createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');
       
        if (generated_signature == razorpay_signature) {
            
            await paymentModel.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
            res.redirect(`http://localhost:5173/payment-success?reference_no=${razorpay_payment_id}`);
            // res.status(200).json({
            //     success: true,
            //     message:'payment is successful' 
            // });
        } else {
            res.status(500).json({
                success: false,
                message:'payment is failed' 
            });
        }
        
    } catch (error)     {
        console.error('Error payment verification:', error);
        res.status(500).json({
            success: false,
            message: 'Error payment verification',
            error: error.message
        });
    }
};

const getKey = async (req, res, next) => {
    try {
     
        res.status(200).json({
            key:process.env.RAZORPAY_API_KEY
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while accessing key',
            error: error.message
        });
    }
};


export { checkout, paymentVerification, getKey };