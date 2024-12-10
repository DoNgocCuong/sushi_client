const express=require('express');
const router=express.Router();
const PaymentController=require('../app/controllers/PaymentControllers.js')
//api


//render
router.get('/',PaymentController.index)
module.exports=router;