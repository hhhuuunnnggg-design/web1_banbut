// gioHang.js

// Hàm tạo một item giỏ hàng
export function taoGioHang(idSanPham, imgSanPham, tenSanPham, soLuongSanPham) {
  return {
    idSanPham: idSanPham,
    imgSanPham: imgSanPham,
    tenSanPham: tenSanPham,
    soLuongSanPham: soLuongSanPham,
  };
}

// Hàm lấy email người dùng hiện tại từ localStorage
export function getCurrentUserEmail() {
  return localStorage.getItem("loggedInUserEmail");
}

// hàm lấy danh sách giỏ hàng trên localstorage
export function layDsItemGioHang() {
  const currentUserEmail = getCurrentUserEmail(); // Lấy email người dùng hiện tại
  console.log(currentUserEmail);

  var DsItemGioHang = [];

  if (currentUserEmail) {
    //nguyendinhhung@gmail.com
    var jsonDSItemGioHang = localStorage.getItem(currentUserEmail);
    console.log(DsItemGioHang);

    if (jsonDSItemGioHang) {
      DsItemGioHang = JSON.parse(jsonDSItemGioHang); // Parse giỏ hàng từ JSON
      console.log(DsItemGioHang);
    }
  }

  return DsItemGioHang;
}

// Hàm lưu giỏ hàng vào localStorage theo email người dùng
export function luuDSvaoStorage(item) {
  const currentUserEmail = localStorage.getItem("loggedInUserEmail");

  if (currentUserEmail) {
    var jsonDSItemGioHang = JSON.stringify(item); // Chuyển mảng giỏ hàng sang chuỗi JSON
    localStorage.setItem(currentUserEmail, jsonDSItemGioHang); // Lưu giỏ hàng theo key là email người dùng
  } else {
    alert("Không thể lưu giỏ hàng vì không có người dùng đăng nhập.");
  }
}
