class ContactControlle{
    index(req,res){

        res.render('contact',{layout:'main'});
    }
}


module.exports=new ContactControlle;