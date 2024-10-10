// gioHang.js

// Hàm tạo một item giỏ hàng
export function taoGioHang(
  idSanPham,
  imgSanPham,
  tenSanPham,
  giaSanPham,
  soLuongSanPham
) {
  return {
    idSanPham: idSanPham,
    imgSanPham: imgSanPham,
    tenSanPham: tenSanPham,
    giaSanPham: giaSanPham,
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

  var DsItemGioHang = [];

  if (currentUserEmail) {
    //nguyendinhhung@gmail.com

    var jsonDSItemGioHang = localStorage.getItem(currentUserEmail);

    if (jsonDSItemGioHang) {
      DsItemGioHang = JSON.parse(jsonDSItemGioHang); // Parse giỏ hàng từ JSON
    }
  }

  return DsItemGioHang;
}

// Hàm lưu giỏ hàng vào localStorage theo email người dùng
export function luuDSvaoStorage(item) {
  const currentUserEmail = localStorage.getItem("loggedInUserEmail");

  if (currentUserEmail) {
    var jsonDSItemGioHang = JSON.stringify(item); // Chuyển mảng giỏ hàng sang chuỗi JSON

    localStorage.setItem(currentUserEmail, jsonDSItemGioHang);
  } else {
    alert("Không thể lưu giỏ hàng vì không có người dùng đăng nhập.");
  }
}

// xem giỏ hàng
const xemgiohang = document.getElementById("xem_gio_hang");
xemgiohang.addEventListener("click", function () {
  console.log("bạn da click vao gio hàng");
  document.querySelector(".cart ").style.left = 0;
});

// đóng giỏ hàng
const close = document.getElementById("close_cart");
close.addEventListener("click", function () {
  console.log("đóng cart");
  document.querySelector(".cart").style.left = "100%";
});

// -----------test thư viện-------------------------
const thuvien = document.getElementsByClassName("thu_vien")[0];

const libraryContainer = document.getElementById("products");
if (thuvien) {
  thuvien.addEventListener("click", function () {
    console.log("bạn đã click vào thư viện");

    // Tạo giao diện thư viện
    libraryContainer.innerHTML = `
      <h2>Thư viện</h2>
      <p>Chào mừng bạn đến với thư viện của chúng tôi!</p>
      <button class="close-btn">Đóng</button>
    `;

    libraryContainer.classList.add("visible"); // Hiện giao diện

    // Gán sự kiện cho nút đóng
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", function () {
      libraryContainer.classList.remove("visible"); // Ẩn giao diện
    });
  });
} else {
  console.log("Không tìm thấy phần tử với class 'thu_vien'");
}
