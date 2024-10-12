// hinhThucThanhToan.js

import { GuiQr } from "./thanhtoanQr.js";
import { checkThongTinThanhToan } from "./thongTinThanhToan.js";
function checkHinhThucThanhToan() {
  const dathang = document.getElementsByClassName("order-button")[0];
  const bankTransferInput = document.getElementById("bank-transfer");
  const cashTransferInput = document.getElementById("cash-transfer");

  if (bankTransferInput.checked) {
    console.log("Bạn đã chọn phương thức thanh toán: Chuyển khoản ngân hàng");
    GuiQr();
  } else if (cashTransferInput.checked) {
    console.log("Bạn đã chọn phương thức thanh toán: thanh toán bằng tiền mặt");
    thanhToanKhiNhanHang();
  } else {
    console.log("Chưa chọn phương thức thanh toán");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dathang = document.getElementsByClassName("order-button")[0];
  dathang.addEventListener("click", DatHang);
});

function thanhToanKhiNhanHang() {
  // Lấy email người dùng đã đăng nhập từ localStorage
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const sanPhamData = JSON.parse(localStorage.getItem(loggedInUserEmail));

  if (sanPhamData.length === 0) {
    console.log("Không có sản phẩm nào để di chuyển.");
    return;
  }

  // Lấy thông tin người dùng từ localStorage
  const users = JSON.parse(localStorage.getItem("users"));
  const matchedUser = users.find(
    (user) => user.userEmail === loggedInUserEmail
  );

  if (matchedUser) {
    // Thêm thông tin ngày mua và tình trạng thanh toán
    const donhangMoi = {
      sp: sanPhamData, // Danh sách sản phẩm
      ngaymua: new Date().toISOString(), // Lấy thời gian hiện tại theo định dạng ISO 8601
      tinhTrang: "Đang chờ xử lý", // Trạng thái thanh toán mặc định
    };

    // Đẩy đơn hàng mới vào mảng `donhang[]`
    matchedUser.donhang.push(donhangMoi);

    // Cập nhật lại danh sách users vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Xóa sản phẩm khỏi email `h@gmail.com`
    localStorage.setItem(loggedInUserEmail, JSON.stringify([]));

    alert("đặt hàng thành công");
  } else {
    console.log("Không tìm thấy user với email này.");
  }
}

function DatHang() {
  const isThongTinHopLe = checkThongTinThanhToan();
  if (isThongTinHopLe) {
    checkHinhThucThanhToan();
  }
}
