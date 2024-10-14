import { layDsItemGioHang, luuDSvaoStorage } from "./gioHang.js";

export function tinhTongTienGioHang() {
  const dsItemGioHang = layDsItemGioHang();
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

export function drawcartGui() {
  const dsItemGioHang = layDsItemGioHang();

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
          <input style="width: 30px; outline: none" type="number" id=input_number value="${soLuongSanPham}" min="0" />
        </td>
        <td style="cursor: pointer" class="xoa-san-pham" data-id="${idSanPham}">Xóa</td>
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

// Hàm xóa sản phẩm khỏi giỏ hàng
function xoaSanPhamKhoiGioHang(idSanPham) {
  let dsItemGioHang = layDsItemGioHang();
  dsItemGioHang = dsItemGioHang.filter((item) => item.idSanPham !== idSanPham);

  // Lưu lại giỏ hàng đã cập nhật
  luuDSvaoStorage(dsItemGioHang);

  // Vẽ lại giỏ hàng sau khi xóa
  drawcartGui();
}

drawcartGui();
