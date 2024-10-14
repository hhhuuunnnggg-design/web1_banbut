export function drawcartGui() {
  const dsItemGioHang = layDsItemGioHang();

  const cartTableBody = document.querySelector("Pay__Order__body");
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
}
