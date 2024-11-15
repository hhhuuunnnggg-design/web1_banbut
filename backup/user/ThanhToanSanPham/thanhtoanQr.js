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
  return;
}else{
  try{
    const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=pGUitLoL7zGVy1lVg1lI8MsZ1uT3Q6cBOMqhFuUlc1zzjeFn6Ub0PYuFq2mnMgY6JF2AZmyg8ChWq7KohVP_A8BzgJuChzjNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnB6NfkYH50W8ti1v6EfLVXbVsqYgvbH_90-2Fxt9OMwhKws0pdcg5j8T57nPnujOycYSYdP4Djo_QrKPFSRGB2z1U8e07rxmRdz9Jw9Md8uu&lib=MYHRLOEH-QL7zZAEgTyvOOCAOGknlh8FV");
    const data= await response.json();
    const lastPaid =data.data[data.data.length-1];
    const lastPrice = lastPaid["Giá trị"];
    const lastContent = lastPaid["Mô tả"];
    if (lastPrice>=price && lastContent.includes(content)){
      alert("Thanh toán thành công");
      clearGioHang();
      clearInterval(checkInterval);
      success = true;
    }else{
      console.log("không thành công");
    }
      }catch(error){
        console.error("Lỗi:", error);
      }
      quayLaiTrangChu();
}
}
function clearGioHang() {
  const currentUserEmail = getCurrentUserEmail();
  
  if (currentUserEmail) {
    localStorage.removeItem('currentUserEmail'); 
    localStorage.removeItem(currentUserEmail);  
  }
  DsItemGioHang = [];
}
function quayLaiTrangChu() {
  window.location.href = 'index_user.html';
}
