const express=require('express');
const router=express.Router();
const PaymentController=require('../app/controllers/PaymentControllers.js')
//api
router.get('/api',PaymentController.rendePayment)

//render
router.get('/',PaymentController.index)

module.exports=router;