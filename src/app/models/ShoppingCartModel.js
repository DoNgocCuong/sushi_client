const db = require('../../config/db'); // Import kết nối MySQL

class ShoppingCart {
    // Lấy giỏ hàng của một khách hàng
    static getCartByCustomerId(customerId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM GIOHANG WHERE customerId = ?`;
            db.query(query, [customerId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Thêm món vào giỏ hàng
    static addToCart(productId, customerId) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO GIOHANG (productId, customerId) VALUES (?, ?)`;
            db.query(query, [productId, customerId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = ShoppingCart;
