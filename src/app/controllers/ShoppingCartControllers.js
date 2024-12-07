const ShoppingCart = require('../models/ShoppingCartModel'); // Import model ShoppingCart

class ShoppingCartController {
    // Hiển thị giỏ hàng
    async index(req, res) {
        const customerId = 1; // Lấy customerId từ đâu đó (giả sử là 1 cho ví dụ này)

        try {
            // Lấy giỏ hàng của khách hàng từ database
            const cartItems = await ShoppingCart.getCartByCustomerId(customerId);

            // Render giỏ hàng ra view
            res.render('shopping_cart', { cartItems: cartItems });
        } catch (err) {
            console.error('Lỗi khi lấy giỏ hàng:', err);
            res.status(500).send('Lỗi server');
        }
    }

    // Thêm món vào giỏ hàng
    async addToCart(req, res) {
        const { productId, customerId } = req.body; // Lấy thông tin productId và customerId từ body request

        try {
            // Thêm món vào giỏ hàng
            await ShoppingCart.addToCart(productId, customerId);
            // Sau khi thêm thành công, chuyển hướng về trang giỏ hàng
            res.redirect('/shopping_cart');
        } catch (err) {
            console.error('Lỗi khi thêm món vào giỏ hàng:', err);
            res.status(500).send('Lỗi server');
        }
    }
}

module.exports = new ShoppingCartController();
