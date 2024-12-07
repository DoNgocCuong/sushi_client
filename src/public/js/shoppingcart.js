
var CartApi = "http://localhost:3000/shopping_cart/api"; 

console.log(sessionStorage.getItem("fullname"));



document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả các nút tăng/giảm
    const quantityContainers = document.querySelectorAll(".cart-item_quantity");

    quantityContainers.forEach((container) => {
        const decreaseBtn = container.querySelector(".decrease");
        const increaseBtn = container.querySelector(".increase");
        const quantityInput = container.querySelector(".quantity-input");

        // Xử lý nút giảm
        decreaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        // Xử lý nút tăng
        increaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    });
});

function handleGetCart(callback) {
    document.addEventListener("DOMContentLoaded", function () {
        fetch(`${CartApi}?email=${sessionStorage.getItem("email")}`)
            .then(function (response) {
                return response.json();  
            })
            .then(callback)
            .catch(function(error) {
                console.error('Lỗi khi gọi API: ', error);
               
            });
    });
    
}
    
function renderCart(carts) {
    var listDish = document.querySelector('.shopping-cart_container');
    var htmls = carts.map(function (dish) {
        console.log(dish);
        return `
            <li class="cart-item">
                <div class="description">
                    <div class="cart-item_img">
                        <img src="${dish.url}" alt="${dish.tenmon}">  <!-- Sửa alt ở đây -->
                    </div>
                    <div class="cart-item_des">
                        <p>${dish.tenmon}</p>
                    </div>
                </div>

                <div class="cart-item_kind">
                    <span>${dish.maloai}</span>
                </div>

                <div class="cart-item_price">
                    <p>${dish.gia}</p>
                </div>
                <div class="cart-item_quantity">
                    <button class="quantity-btn decrease">-</button>
                    <input type="text" class="quantity-input" value="1" readonly>
                    <button class="quantity-btn increase">+</button>
                </div>

                <div class="cart-item_remove">
                    <i class="ti-close"></i>
                </div>
            </li>
        `;
    });
    listDish.innerHTML = htmls.join('');
}


handleGetCart(renderCart);