const express=require('express');
const router=express.Router();
const ContactController=require('../app/controllers/ContactControllers')

router.use('/',ContactController.index)
module.exports=router;

