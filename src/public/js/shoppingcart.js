
var CartApi = "http://localhost:3000/shopping_cart/api"; 
var CartApiRemove = "http://localhost:3000/shopping_cart/api/remove";
//console.log(sessionStorage.getItem("fullname"));





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
    var listDish = document.querySelector('.shopping-cartContainer');
    var htmls = carts.map(function (dish) {
        return `
            <li class="cart-item" data-mamon="${dish.mamon}">
                <div class="description">
                    <div class="cart-item_img">
                        <img src="${dish.url}" alt="${dish.tenmon}">  
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

    // Sau khi render xong, gắn sự kiện tăng/giảm số lượng
    attachQuantityEvents();
    attachRemoveEvents();
    
}

function attachQuantityEvents() {
    const quantityContainers = document.querySelectorAll(".cart-item_quantity");

    quantityContainers.forEach(container => {
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
}

function handleRemoveItem(cartItem, dishId) {
    const email = sessionStorage.getItem("email");

    // Xóa món ăn khỏi giao diện
    cartItem.remove();
    // Gửi yêu cầu xóa đến backend (DELETE request)
    fetch(`http://localhost:3000/shopping_cart/api/remove?email=${email}&id=${dishId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Lỗi khi xóa món ăn');
        }

        // Sau khi xóa thành công, lấy lại giỏ hàng mới
        return fetch(`${CartApi}?email=${email}`);
    })
    .then(response => response.json())
    .then(updatedCart => {
        // Cập nhật lại giao diện với giỏ hàng mới
        renderCart(updatedCart);
        console.log(`Món ăn ${dishId} đã được xóa thành công trong gio hang ${email}`);
    })
    .catch(error => console.error('Lỗi khi gửi yêu cầu xóa:', error));
}

// Hàm gắn sự kiện xóa món ăn
function attachRemoveEvents() {
    const removeButtons = document.querySelectorAll('.cart-item_remove i');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cartItem = this.closest('.cart-item');
            const dishId = cartItem.getAttribute('data-mamon');
            handleRemoveItem(cartItem, dishId); // Gọi hàm xóa món ăn
        });
    });
}



handleGetCart(renderCart);