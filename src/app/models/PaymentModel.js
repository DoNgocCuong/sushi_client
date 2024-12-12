const db = require('../../config/db'); // Import kết nối MySQL

class PaymentModel {
    static getPayment(email) {
            return new Promise((resolve, reject) => {
                const query = `CALL Tinh_Hoa_Don(${db.escape(email)})`;
                db.query(query, (err, results) => {
                    if (err) {
                        console.error('Lỗi SQL khi cập nhật số lượng món ăn:', err);
                        return reject(err);
                    }
                    resolve(results);
                });
            }
        )
    };
}
module.exports = PaymentModel;