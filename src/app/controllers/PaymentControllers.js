const PaymentModel = require('..\\models\\PaymentModel'); // Import model

class PaymentControllers {
    async index(req, res) {
        res.render('payment',{layout:'main'});
    }

    async rendePayment(req, res) {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email không hợp lệ.' });
        }
    
        try {
            const paymentResult = await PaymentModel.getPayment(email);
    
            // Kiểm tra kết quả trả về từ PaymentModel
            console.log('Kết quả trả về từ PaymentModel:', paymentResult);
    
           
            if (Array.isArray(paymentResult) && Array.isArray(paymentResult[0])) {
                const paymentData = paymentResult[0][0]; // Lấy phần tử đầu tiên
              //  console.log('Dữ liệu gửi đến frontend:', paymentData);
    
                // Trả dữ liệu JSON
                return res.json(paymentData || { error: 'Không có dữ liệu thanh toán.' });
            } else {
                return res.status(500).json({ error: 'Dữ liệu trả về không hợp lệ.' });
            }
        } catch (err) {
            console.error('Lỗi khi xử lý thanh toán:', err);
            res.status(500).json({ error: 'Lỗi server.' });
        }
    }
    
}

module.exports = new PaymentControllers();