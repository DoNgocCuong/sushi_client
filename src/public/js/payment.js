var paymentApi = "http://localhost:3000/paymentonline/api"


function handleGetPayment(callback) {
    document.addEventListener("DOMContentLoaded", function () {
        const email = sessionStorage.getItem("email");
        console.log(email);
        if(!email)
            return;
        fetch(`${paymentApi}?email=${sessionStorage.getItem("email")}`)
            .then(function (response) {
                return response.json();  
            })
            .then(callback)
            .catch(function(error) {
                console.error('Lỗi khi gọi API: ', error);
               
            });
    });
    
}
    
function renderPayment(result) {
    var listPayment = document.querySelector('.payment-container');
    if (!listPayment) return;

    // Định dạng tiền tệ
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Tính tổng tiền bao gồm phí giao hàng
    const shippingFee = 30000;
    const totalWithShipping = parseFloat(result.TongTienSauKhuyenMai) + shippingFee;

    // Nội dung HTML
    var htmls = `
        <div class="voucher">
            <i class="ti-gift"></i>
            <select>
                <option value="" disabled selected>Chọn hình thức thanh toán</option>
                <option>Thanh toán khi nhận hàng</option>
                <option>Thanh toán bằng VNPAY</option>
                <option>Thanh toán bằng Ngân hàng</option>
                <option>Thanh toán bằng Ví MOMO</option>
            </select>
        </div>
        <div>
            <p>Tổng số tiền</p>
            <span>${formatCurrency(result.TongTienTruocKhuyenMai)}</span>
        </div>
        <div>
            <p>Khuyến Mãi</p>
            <span>Hạng ${result.Hang} (${result.PhanTramKhuyenMai}%)</span>
        </div>
        <div>
            <p>Phí giao hàng</p>
            <span>${formatCurrency(shippingFee)}</span>
        </div>
        <div>
            <p>Số tiền thanh toán</p>
            <span>${formatCurrency(totalWithShipping)}</span>
        </div>
        <input type="text" placeholder="Thêm ghi chú" />
        <button>Xác nhận thanh toán</button>
    `;

    listPayment.innerHTML = htmls;
}



handleGetPayment(renderPayment);