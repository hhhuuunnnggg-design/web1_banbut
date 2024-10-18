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

    // Lấy thông tin khách hàng từ các trường input trong form
    const ten = document.getElementById("name").value;
    const ho = document.getElementById("lname").value;
    const diachi = document.getElementById("address").value;
    const quocgia = document.getElementById("country").value;
    const tinh = document.getElementById("detail").value;
    const sdt = document.getElementById("number").value;
    const email = document.getElementById("Email").value;
    const ghichu = document.getElementById("note").value;

    const khachHang = {
      ho: ho,
      ten: ten,
      diachi: diachi,
      quocgia: quocgia,
      tinh: tinh,
      sdt: sdt,
      email: email,
      ghichu: ghichu,
    };

    // Kiểm tra mảng donhang và thongtinkhachhang đã tồn tại chưa, nếu chưa thì khởi tạo chúng
    if (!Array.isArray(matchedUser.donhang)) {
      matchedUser.donhang = [];
    }

    if (!Array.isArray(matchedUser.thongtinkhachhang)) {
      matchedUser.thongtinkhachhang = [];
    }

    // Đẩy đơn hàng mới vào mảng `donhang[]`
    matchedUser.donhang.push(donhangMoi);

    // Đẩy thông tin khách hàng vào mảng `thongtinkhachhang[]`
    matchedUser.thongtinkhachhang.push(khachHang);

    // Cập nhật lại danh sách users vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Xóa sản phẩm khỏi email sau khi đặt hàng thành công
    localStorage.setItem(loggedInUserEmail, JSON.stringify([]));

    alert("Đặt hàng thành công");
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
