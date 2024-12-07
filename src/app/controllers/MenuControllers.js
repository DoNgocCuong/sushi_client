
const MenuModel = require('..\\models\\MenuModel'); // Import model

class loginController {
    index(req, res) {
        const productsPromise = new Promise((resolve, reject) => {
            MenuModel.getAllProducts((err, products) => {
                if (err) {
                    reject('Lỗi khi lấy sản phẩm: ' + err);  // Nếu có lỗi, Promise sẽ bị reject
                } else {
                    resolve(products); // Nếu thành công, Promise sẽ được resolve với kết quả
                }
            });
        });
        
        const branchPromise = new Promise((resolve, reject) => {
            MenuModel.getAllBranch((err, branch) => {
                if (err) {
                    reject('Lỗi khi lấy chi nhánh: ' + err);
                } else {
                    resolve(branch);
                }
            });
        });

        const typeOfDishPromise = new Promise((resolve, reject) => {
            MenuModel.getAllTypeOfDish((err, TypeOfDish) => {
                if (err) {
                    reject('Lỗi khi lấy loại món ăn: ' + err);
                } else {
                    resolve(TypeOfDish);
                }
            });
        });

        // Sử dụng Promise.all để chờ tất cả các truy vấn hoàn thành
        Promise.all([productsPromise,branchPromise, typeOfDishPromise])
            .then(([products,branch, TypeOfDish]) => {
                // Sau khi tất cả dữ liệu đã được lấy, render view với tất cả dữ liệu
                res.render('Menu', { 
                    products,
                    branch, 
                    TypeOfDish,
                    layout: 'main'
                });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send('Lỗi server');
            });
    }
    async searchDish(req, res) {
        const { branchId, dishTypeId, priceRange } = req.query;
        try {
            const filteredDish = await MenuModel.filterProducts(branchId, dishTypeId, priceRange);
            res.json(filteredDish);
        } catch (err) {
            console.error('Lỗi khi lọc sản phẩm:', err);
            res.status(500).send('Lỗi server');
        }
    }
}

module.exports = new loginController();
