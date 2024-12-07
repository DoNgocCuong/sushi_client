const db = require("../../../config/db");

const findByEmail = function (email, callback) {
  const query = "SELECT * FROM KHACHHANG WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn email:", err.message);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0]);
  });
};

const createUser = function (
  phone,
  name,
  email,
  citizenID,
  gender,
  password,
  callback
) {
  db.query("SELECT * FROM KHACHHANG", (err, rows) => {
    if (err) {
      console.error("Lỗi khi truy vấn danh sách khách hàng:", err.message);
      return callback(err, null);
    }

    const length = rows.length + 1;
    const id = "KH" + length.toString();

    const query =
      "INSERT INTO KHACHHANG (makhachhang, sdt, fullname, email, cccd, gioitinh, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [id, phone, name, email, citizenID, gender, password],
      (err, result) => {
        if (err) {
          console.error("Lỗi khi thêm dữ liệu:", err.message);
          return callback(err, null);
        }

        console.log("Thêm khách hàng thành công với ID:", id);
        callback(null, result);
      }
    );
  });
};

module.exports = { findByEmail, createUser };
