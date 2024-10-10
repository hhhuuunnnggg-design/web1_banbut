import { layDsItemGioHang, luuDSvaoStorage } from "./gioHang.js";

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

  let tongTien = 0;

  dsItemGioHang.forEach((item) => {
    const { idSanPham, imgSanPham, tenSanPham, soLuongSanPham } = item;

    const giaSanPham = 320000; // Giá sản phẩm tạm thời (có thể thay đổi tùy vào từng sản phẩm)

    // Tính tổng giá cho sản phẩm này (số lượng * giá)
    const tongGiaSanPham = giaSanPham * soLuongSanPham;
    tongTien += tongGiaSanPham;

    // Tạo HTML cho một hàng sản phẩm
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

  // đây là tổng tiền
  priceTotalElement.textContent = tongTien.toLocaleString();

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

// Gọi hàm để vẽ giao diện khi trang được tải
drawcartGui();
