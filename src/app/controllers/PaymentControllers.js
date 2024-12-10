
//const PaymentModel = require('..\\models\\PaymentModel'); // Import model

class PaymentController {
    index(req,res){

        res.render('payment',{layout:'main'});
    }
}

module.exports = new PaymentController();
