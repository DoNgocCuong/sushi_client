const ShoppingCartModel = require('..\\models\\ShoppingCartModel'); // Import model


class ShoppingCartController{
    index(req,res){
        res.render('shoppingCart',{layout:'main'});
    }

    async rendeCartDish(req, res) {
        const {email} = req.query;
       // console.log(email);
        try {
            const CartDish = await ShoppingCartModel.getProductsCart(email);
            //console.log('cartdish:',CartDish)
            res.json(CartDish);
        } catch (err) {
            console.error('Lỗi khi lọc sản phẩm:', err);
            res.status(500).send('Lỗi server');
        }
    }

    async removeCartDish(req, res) {
        const { email,id } = req.query; // Lấy id món ăn từ params
        try {
            await ShoppingCartModel.removeProductFromCart(email, id); // Gọi hàm model để xóa món ăn
            res.status(200).send({ message: 'Món ăn đã được xóa khỏi giỏ hàng.' });
        } catch (err) {
            console.error('Lỗi khi xóa món ăn:', err);
            res.status(500).send('Lỗi khi xóa món ăn');
        }
    }
}


module.exports=new ShoppingCartController;