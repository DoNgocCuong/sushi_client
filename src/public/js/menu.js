
var searchApi = "http://localhost:3000/menu/api";  


function handleGetSearch(callback) {
    var btnSearch = document.querySelector('#button-menu');
    btnSearch.onclick = function () {
        var branchId = document.querySelector('#type-of-branch').value;
        var dishTypeId = document.querySelector('#type-of-dish').value;
        var priceRange = document.querySelector('#type-of-price').value;

        fetch(`${searchApi}?branchId=${branchId}&dishTypeId=${dishTypeId}&priceRange=${priceRange}`)
            .then(function (response) {
                return response.json();  
            })
            .then(callback)
            .catch(function(error) {
                console.error('Lỗi khi gọi API: ', error);
                alert('Đã xảy ra lỗi khi tải dữ liệu.');
            });
    }
}


function renderSearch(searchs) {
    var listDish = document.querySelector('.content-menu');
    var htmls = searchs.map(function (dish) {
        return `
            <li>
                <div><button>+</button></div>
                <div class="img-products-branch">
                    <img src="${dish.URL}" alt="" class="img-branch">
                </div>
                <p>${dish.TENMON}</p>
                <p>${dish.MOTA}</p>
                <p>${dish.GIA}đ</p>    
            </li>
        `;
    });
    listDish.innerHTML = htmls.join('');
}

handleGetSearch(renderSearch);
