// Giả sử getCurrentUserEmail được định nghĩa ở đây hoặc import từ file khác
function getCurrentUserEmail() {
  return localStorage.getItem("loggedInUserEmail");
}
let success = false;
let checkInterval;
// Hàm gửi QR
export function GuiQr() {
  const currentUserEmail = getCurrentUserEmail()+"muahang";
  const MY_MbBank = {
    bank_id: "Vietinbank",
    AccCount: "109879341167",
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
           src="https://img.vietqr.io/image/${MY_MbBank.bank_id}-${MY_MbBank.AccCount}-qr_only.png?amount=${tongTien}&addInfo=${currentUserEmail}"
           alt="Mã QR thanh toán" />
      <h3>Tổng tiền: <span>${tongTien}</span> đ</h3>
    </div>
  `;

  // Thêm thông báo khi tạo mã QR
  alert("Bạn đã tạo mã QR. Vui lòng quét mã để chuyển tiền.");
  checkInterval = setInterval(() => {
    checkPaid(tongTien,currentUserEmail);
  }, 1000);
}
thucHienChuyenKhoan();
// Hàm thực hiện chuyển khoản (giả định)
function thucHienChuyenKhoan() {
  const currentUserEmail = getCurrentUserEmail(); // Lấy email người dùng
  const tongTien = Tongtien(); // Tính tổng tiền

  // Nếu không có người dùng đăng nhập, không thực hiện chuyển khoản
  if (!currentUserEmail) {
    alert("Bạn cần đăng nhập để thực hiện chuyển khoản.");
    return;
  }
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
  const currentUserEmail = getCurrentUserEmail();
  var DsItemGioHang = [];

  if (currentUserEmail) {
    const jsonDSItemGioHang = localStorage.getItem(currentUserEmail);

    if (jsonDSItemGioHang) {
      DsItemGioHang = JSON.parse(jsonDSItemGioHang);
    }
  }

  return DsItemGioHang;
}
// -----------------------------------------
export function drawcartGui() {
  const dsItemGioHang = DsItemGioHang();

  const cartTableBody = document.querySelector("tbody");
  const priceTotalElement = document.querySelector(".price-total span");

  cartTableBody.innerHTML = "";

  if (dsItemGioHang.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="4">Giỏ hàng trống</td></tr>`;
    priceTotalElement.textContent = "0";
    return;
  }

  dsItemGioHang.forEach((item) => {
    const { idSanPham, imgSanPham, tenSanPham, soLuongSanPham, giaSanPham } =
      item;

    const tongGiaSanPham = giaSanPham * soLuongSanPham;

    const productRow = `
      <tr>
        <td style="display: flex; align-items: center">
          <img style="width: 70px" src="${imgSanPham}" alt="${tenSanPham}" />${tenSanPham}
        </td>
        <td>
          <p><span>${giaSanPham}</span><sup>đ</sup></p>
        </td>
        <td>
          <input style="width: 30px; outline: none" type="text" id=input_number value="${soLuongSanPham}" min="0" />
        </td>
        
      </tr>
    `;

    // Thêm hàng sản phẩm vào bảng
    cartTableBody.innerHTML += productRow;
  });

  // đây là tổng tiền, sử dụng hàm tinhTongTienGioHang để cập nhật tổng tiền
  const tongTien = tinhTongTienGioHang();
  priceTotalElement.textContent = tongTien;

  // Thêm sự kiện xóa sản phẩm khỏi giỏ hàng
  document.querySelectorAll(".xoa-san-pham").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idSanPham = e.target.getAttribute("data-id");
      xoaSanPhamKhoiGioHang(idSanPham);
    });
  });
}
// drawcartGui();
async function checkPaid(price,content) {
if (success) {
  clearInterval(checkInterval);
  quayLaiTrangChu();
  return;
}else{
  try{
    const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=pGUitLoL7zGVy1lVg1lI8MsZ1uT3Q6cBOMqhFuUlc1zzjeFn6Ub0PYuFq2mnMgY6JF2AZmyg8ChWq7KohVP_A8BzgJuChzjNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnB6NfkYH50W8ti1v6EfLVXbVsqYgvbH_90-2Fxt9OMwhKws0pdcg5j8T57nPnujOycYSYdP4Djo_QrKPFSRGB2z1U8e07rxmRdz9Jw9Md8uu&lib=MYHRLOEH-QL7zZAEgTyvOOCAOGknlh8FV");
    const data= await response.json();
    const lastPaid =data.data[data.data.length-1];
    const lastPrice = lastPaid["Giá trị"];
    const lastContent = lastPaid["Mô tả"];
    if (lastPrice>=price && lastContent.includes(content)){
      thanhToanKhiNhanHang();
      success = true;
      clearInterval(checkInterval);
      quayLaiTrangChu();
    }else{
      console.log("không thành công");
    }
      }catch(error){
        console.error("Lỗi:", error);
      }
}
}
function quayLaiTrangChu() {
  window.location.href = 'index_user.html';
}
function thanhToanKhiNhanHang() {
  // Lấy email người dùng đã đăng nhập từ localStorage
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const sanPhamData = JSON.parse(localStorage.getItem(loggedInUserEmail));

  if (!sanPhamData || sanPhamData.length === 0) {
    console.log("Không có sản phẩm nào để di chuyển.");
    return;
  }

  // Lấy thông tin người dùng từ localStorage
  const users = JSON.parse(localStorage.getItem("users"));
  const matchedUser = users.find(
    (user) => user.userEmail === loggedInUserEmail
  );

  if (matchedUser) {
    // Lấy thông tin khách hàng từ các trường input trong form
    const ten = document.getElementById("name").value;
    const ho = document.getElementById("lname").value;
    const diachi = document.getElementById("address").value;
    const quocgia = document.getElementById("country").value;
    const tinh = document.getElementById("detail").value;
    const sdt = document.getElementById("number").value;
    const email = document.getElementById("Email").value;
    const ghichu = document.getElementById("note").value;

    // Thêm trực tiếp thông tin khách hàng vào từng sản phẩm
    const sanPhamDataWithCustomerInfo = sanPhamData.map((sanPham) => {
      return {
        ...sanPham, // Giữ nguyên các thông tin sản phẩm
        ho: ho, // Thêm thông tin khách hàng trực tiếp vào sản phẩm
        ten: ten,
        diachi: diachi,
        quocgia: quocgia,
        tinh: tinh,
        sdt: sdt,
        email: email,
        ghichu: ghichu,
      };
    });

    // Tạo đối tượng đơn hàng mới
    const donhangMoi = {
      sanPham: sanPhamDataWithCustomerInfo, // Danh sách sản phẩm cùng với thông tin khách hàng
      ngaymua: new Date().toISOString(), // Thời gian mua hàng hiện tại
      tinhTrang: "Đang chờ xử lý", // Trạng thái đơn hàng
    };

    // Kiểm tra mảng donhang đã tồn tại chưa, nếu chưa thì khởi tạo
    if (!Array.isArray(matchedUser.donhang)) {
      matchedUser.donhang = [];
    }

    // Đẩy đơn hàng mới vào mảng `donhang[]`
    matchedUser.donhang.push(donhangMoi);

    // Cập nhật lại danh sách users vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Xóa sản phẩm khỏi giỏ hàng sau khi đặt hàng
    localStorage.setItem(loggedInUserEmail, JSON.stringify([]));

    alert("Đặt hàng thành công");
  } else {
    console.log("Không tìm thấy user với email này.");
  }
}
