const ShoppingCartModel = require('..\\models\\ShoppingCartModel'); // Import model


class ShoppingCartController{
    index(req,res){
        res.render('shoppingCart',{layout:'main'});
    }

    async rendeCartDish(req, res) {
        const {email} = req.query;
        console.log(email);
        try {
            const CartDish = await ShoppingCartModel.getProductsCart(email);
            console.log('cartdish:',CartDish)
            res.json(CartDish);
        } catch (err) {
            console.error('Lỗi khi lọc sản phẩm:', err);
            res.status(500).send('Lỗi server');
        }
    }
}


module.exports=new ShoppingCartController;