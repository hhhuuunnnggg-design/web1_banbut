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
    const formattedPrice = Number(giaSanPham).toLocaleString("vi-VN");
    const productRow = `
      <tr>
        <td style="display: flex; align-items: center">
          <img style="width: 70px" src="${imgSanPham}" alt="${tenSanPham}" />${tenSanPham}
        </td>
        <td>
          <p><span>${formattedPrice}</span><sup>vnđ</sup></p>
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

  // cập nhật tổng tiền
  const tongTien = tinhTongTienGioHang();
  priceTotalElement.textContent = tongTien;

  // Thêm sự kiện xóa sản phẩm khỏi giỏ hàng
  document.querySelectorAll(".xoa-san-pham").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idSanPham = e.target.getAttribute("data-id");
      xoaSanPhamKhoiGioHang(idSanPham);
    });
  });

  // Thêm sự kiện cho các input số lượng
  const quantityInputs = document.querySelectorAll("input[type='number']");
  quantityInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const newQuantity = parseInt(e.target.value);
      const idSanPham = e.target
        .closest("tr")
        .querySelector(".xoa-san-pham")
        .getAttribute("data-id");
      capNhatSoLuongSanPham(idSanPham, newQuantity);
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

// Hàm cập nhật số lượng sản phẩm
function capNhatSoLuongSanPham(idSanPham, soLuong) {
  let dsItemGioHang = layDsItemGioHang();

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  dsItemGioHang = dsItemGioHang.map((item) => {
    if (item.idSanPham === idSanPham) {
      return { ...item, soLuongSanPham: soLuong };
    }
    return item;
  });

  luuDSvaoStorage(dsItemGioHang);

  drawcartGui();
}

drawcartGui();
