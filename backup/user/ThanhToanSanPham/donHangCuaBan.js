// Hàm lấy email người dùng hiện tại từ localStorage
export function getCurrentUserEmail() {
  return localStorage.getItem("loggedInUserEmail");
}

// Hàm lấy danh sách giỏ hàng trên localStorage
export function layDsItemGioHang() {
  const currentUserEmail = getCurrentUserEmail(); // Lấy email người dùng hiện tại

  var DsItemGioHang = [];

  if (currentUserEmail) {
    var jsonDSItemGioHang = localStorage.getItem(currentUserEmail);

    if (jsonDSItemGioHang) {
      DsItemGioHang = JSON.parse(jsonDSItemGioHang); // Parse giỏ hàng từ JSON
    }
  }

  return DsItemGioHang;
}

// Hàm tính tổng tiền giỏ hàng
function tinhTongTienGioHang() {
  const dsItemGioHang = layDsItemGioHang();
  return dsItemGioHang.reduce((total, item) => {
    return total + item.giaSanPham * item.soLuongSanPham;
  }, 0);
}

export function drawcartGui() {
  const dsItemGioHang = layDsItemGioHang();

  const cartTableBody = document.querySelector("#cartTableBody"); // Sửa lại selector
  const priceTotalElement = document.querySelector(".price-total span");

  if (!cartTableBody || !priceTotalElement) {
    console.error("Không tìm thấy phần tử cần thiết trong DOM");
    return; // Thoát khỏi hàm nếu phần tử không tồn tại
  }

  cartTableBody.innerHTML = ""; // Đặt lại nội dung của tbody

  if (dsItemGioHang.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="4">Giỏ hàng trống</td></tr>`;
    priceTotalElement.textContent = "0";
    return;
  }

  dsItemGioHang.forEach((item) => {
    const { idSanPham, imgSanPham, tenSanPham, soLuongSanPham, giaSanPham } =
      item;

    const productRow = `
          <tr>
              <td style="display: flex; align-items: center">
                  <img style="width: 70px" src="${imgSanPham}" alt="${tenSanPham}" />${tenSanPham}
              </td>
              <td>
                  <p><span>${giaSanPham}</span><sup>đ</sup></p>
              </td>
              <td>
                  <input style="width: 30px; outline: none" type="number" value="${soLuongSanPham}" min="0" />
              </td>
              <td style="cursor: pointer" class="xoa-san-pham" data-id="${idSanPham}">Xóa</td>
          </tr>
      `;

    // Thêm hàng sản phẩm vào bảng
    cartTableBody.innerHTML += productRow;
  });

  // Cập nhật tổng tiền
  const tongTien = tinhTongTienGioHang();
  priceTotalElement.textContent = tongTien;
}

// Đảm bảo hàm này chỉ được gọi sau khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", () => {
  drawcartGui();
});
