const express=require('express');
const router=express.Router();
const MenuController=require('..\\app\\controllers\\MenuControllers')

router.get('/api',MenuController.searchDish)
router.get('/',MenuController.index)
module.exports=router;
