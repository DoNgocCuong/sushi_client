const db = require('../../config/db'); // Import kết nối MySQL
class ShoppingCartModel {
    static getProductsCart(email) {
        return new Promise((resolve, reject) => {
            // Bao quanh email bằng dấu nháy đơn trong câu lệnh SQL
            const query = `CALL render_Cart(${db.escape(email)})`;

       
          //  console.log('Query đang chạy:', query);  // Log truy vấn SQL

            db.query(query, (err, results) => {
                if (err) {
                    console.error('Lỗi SQL:', err);  // Log lỗi SQL
                    return reject(err);
                }

                const cartResults = results[0]; // Giả sử dữ liệu trả về nằm ở mảng [0]
              //  console.log('Kết quả trả về từ DB:', cartResults);  // Log kết quả trả về
                resolve(cartResults);
            });
        });
    }
}
module.exports = ShoppingCartModel;
