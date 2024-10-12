// Giả sử getCurrentUserEmail được định nghĩa ở đây hoặc import từ file khác
function getCurrentUserEmail() {
  return localStorage.getItem("loggedInUserEmail");
}

// Hàm gửi QR
export function GuiQr() {
  const MY_MbBank = {
    bank_id: "MB",
    AccCount: "0787495636",
  };

  const hd = document.getElementById("Pay__Method__body");
  if (!hd) {
    console.error("Không tìm thấy phần tử với ID 'Pay__Method__body'");
    return;
  }

  const tongTien = Tongtien();

  hd.innerHTML = `
    <div class="course_qr">
      <img class="course_qr_img" style="width: 290px"
           src="https://img.vietqr.io/image/${MY_MbBank.bank_id}-${MY_MbBank.AccCount}-qr_only.png?amount=${tongTien}"
           alt="Mã QR thanh toán" />
      <h3>Tổng tiền: <span>${tongTien}</span> đ</h3>
    </div>
  `;

  // Thêm thông báo khi tạo mã QR
  alert("Bạn đã tạo mã QR. Vui lòng quét mã để chuyển tiền.");
}

// Hàm thực hiện chuyển khoản (giả định)
function thucHienChuyenKhoan() {
  const currentUserEmail = getCurrentUserEmail(); // Lấy email người dùng
  const tongTien = Tongtien(); // Tính tổng tiền

  // Nếu không có người dùng đăng nhập, không thực hiện chuyển khoản
  if (!currentUserEmail) {
    alert("Bạn cần đăng nhập để thực hiện chuyển khoản.");
    return;
  }

  // Dữ liệu chuyển khoản
  const chuyenKhoanData = {
    email: currentUserEmail,
    amount: tongTien,
    bank_id: "MB",
    AccCount: "0787495636",
  };

  // Gọi API thực hiện chuyển khoản
  fetch("https://api.example.com/chuyen-khoan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chuyenKhoanData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Chuyển khoản không thành công.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Chuyển khoản thành công:", data);
      thongBaoChuyenKhoanThanhCong(); // Gọi thông báo thành công
    })
    .catch((error) => {
      console.error("Lỗi khi chuyển khoản:", error);
      alert("Có lỗi xảy ra trong quá trình chuyển khoản.");
    });
}

// Hàm thông báo chuyển khoản thành công
function thongBaoChuyenKhoanThanhCong() {
  alert("Bạn đã chuyển khoản thành công!");
}

// Hàm tính tổng tiền
function Tongtien() {
  const dsItemGioHang = DsItemGioHang();
  console.log("Danh sách sản phẩm trong giỏ hàng:", dsItemGioHang);
  let tongTien = 0;

  dsItemGioHang.forEach((item) => {
    const { soLuongSanPham, giaSanPham } = item;
    const tongGiaSanPham = giaSanPham * soLuongSanPham;
    tongTien += tongGiaSanPham;
  });

  console.log("Tổng tiền:", tongTien);
  return tongTien;
}

// Hàm lấy danh sách sản phẩm trong giỏ hàng
function DsItemGioHang() {
  const currentUserEmail = getCurrentUserEmail(); // Lấy email người dùng hiện tại
  let DsItemGioHang = [];

  if (currentUserEmail) {
    const jsonDSItemGioHang = localStorage.getItem(currentUserEmail);

    if (jsonDSItemGioHang) {
      DsItemGioHang = JSON.parse(jsonDSItemGioHang); // Parse giỏ hàng từ JSON
    }
  }

  return DsItemGioHang;
}
