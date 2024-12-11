const donHangCuaToi = document.getElementById("myReceipt");
const main = document.getElementById("products");

function drawmyReceipt() {
  donHangCuaToi.addEventListener("click", function () {
    const actionEmail = localStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(localStorage.getItem("users")) || []; // Kiểm tra null cho users
    main.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới

    let hasPendingOrders = false; // Biến kiểm tra trạng thái đơn hàng

    users.forEach((user) => {
      if (user.userEmail === actionEmail) {
        user.donhang?.forEach((dh) => {
          if (dh.tinhTrang === "Đang chờ xử lý") {
            hasPendingOrders = true; // Có đơn hàng chờ xử lý

            const table = document.createElement("table");
            table.classList.add("table", "table-striped", "table-bordered"); // Áp dụng các lớp Bootstrap

            // Tạo tiêu đề bảng
            table.innerHTML = `
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Hình Ảnh</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Giá Tiền</th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                <tr>
                  <td colspan="5" class="text-end"><strong>Tổng Tiền:</strong></td>
                  <td id="totalAmount"><strong>0 VND</strong></td>
                </tr>
                <tr>
                  <td colspan="6" class="text-center" style="color: orange;"><strong>Trạng thái: Đang vận chuyển</strong></td>
                </tr>
              </tfoot>
            `;

            const tbody = table.querySelector("tbody");
            let index = 1;
            let totalAmount = 0;

            dh.sanPham.forEach((sp) => {
              const { tenSanPham, imgSanPham, giaSanPham, soLuongSanPham } = sp;
              const giaTien = giaSanPham * soLuongSanPham;
              totalAmount += giaTien;

              // Tạo hàng mới cho mỗi sản phẩm
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${index++}</td>
                <td>${tenSanPham}</td>
                <td><img src="${imgSanPham}" alt="${tenSanPham}" width="50"></td>
                <td>${giaSanPham.toLocaleString()} VND</td>
                <td>${soLuongSanPham}</td>
                <td>${giaTien.toLocaleString()} VND</td>
              `;
              tbody.appendChild(row);
            });

            table.querySelector(
              "#totalAmount"
            ).innerHTML = `<strong>${totalAmount.toLocaleString()} VND</strong>`;

            main.appendChild(table);
          }
        });
      }
    });

    if (!hasPendingOrders) {
      main.innerHTML =
        "<p style='font-size: 20px; font-weight: bold;'>Không có đơn hàng nào đang vận chuyển</p><br>";
      main.innerHTML +=
        '<img src="Images/anh_rong.png" alt="" style="height: 500px;">';
    }
  });
}

drawmyReceipt();
