function locDonHangTheoLoai() {
  const searchOrderType = document.getElementById("searchOrderType").value;
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  switch (searchOrderType) {
    case "ma":
      filteredOrders = locDonHangTheoMa(searchInput); // Lưu kết quả lọc vào filteredOrders
      console.log(`Bạn đang tìm mã đơn với mã: ${searchInput}`);
      break;
    case "khachhang":
      filteredOrders = locDonHangTheoKhachHang(searchInput); // Lưu kết quả lọc vào filteredOrders
      console.log(`Bạn đang tìm khách hàng với tên: ${searchInput}`);
      break;
    case "trangThai":
      filteredOrders = locDonHangTheoTrangThai(searchInput); // Lưu kết quả lọc vào filteredOrders
      console.log(`Bạn đang tìm trạng thái với: ${searchInput}`);
      break;
    default:
      console.log("Chọn một phương thức tìm kiếm hợp lệ.");
      return;
  }

  loadItems(); // Gọi lại loadItems để hiển thị lại các đơn hàng đã lọc
}

function locDonHangTheoKhachHang(searchInput) {
  const listDH = trangThaiDonHang();
  const filteredOrders = listDH.filter((order) =>
    order.tenKhach.toLowerCase().includes(searchInput)
  );

  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng với tên khách hàng "${searchInput}"</td></tr>`;
  }

  return filteredOrders;
}

function locDonHangTheoMa(searchInput) {
  const listDH = trangThaiDonHang();
  const filteredOrders = listDH.filter((order) =>
    order.maDon.toLowerCase().includes(searchInput)
  );

  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng với mã "${searchInput}"</td></tr>`;
  }

  return filteredOrders;
}

function locDonHangTheoTrangThai(searchInput) {
  const listDH = trangThaiDonHang();
  const filteredOrders = listDH.filter(
    (order) => order.tinhTrang.toLowerCase() === searchInput
  );

  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng với trạng thái "${searchInput}"</td></tr>`;
  }

  return filteredOrders;
}

// đây là hàm dùng chung để vẽ
function displayFilteredOrders(filteredOrders) {
  const tc = document.getElementsByClassName("table-content")[0];
  let s = ``;

  filteredOrders.forEach((local, index) => {
    // Xác định màu sắc cho trạng thái
    const colorClass =
      local.tinhTrang === "đã giao hàng" ? "text-success" : "text-warning"; // class Bootstrap cho màu xanh và cam

    s += `
          <tr class="donhang-row"> <!-- Class được thêm vào hàng -->
            <td>${index + 1}</td><!-- Số thứ tự -->
            <td>${local.maDon}</td>
            <td>${local.tenKhach}</td>
            <td>${local.diaChi}</td>
            <td>${local.soDienThoai}</td>
            
            <td>${local.tongTien}<sup>đ</sup></td>
            <td>${local.ngayMua}</td>
            <td class="${colorClass}">${
      local.tinhTrang
    }</td> <!-- Áp dụng màu sắc cho trạng thái -->
            <td>
              <button class="btn btn-warning" style="background-color:#15de16;border-color:#15de16;color:#ffffff" onclick="duyetDonHang('${
                local.maDon
              }', true)">Duyệt</button>
              <button class="btn btn-danger" onclick="huyDonHang('${
                local.maDon
              }', false)">Xóa</button>
              <button class="btn btn-info" onclick="chiTietDonHang('${
                local.maDon
              }')">chi tiết đơn</button>
            </td>
          </tr>`;
  });

  tc.innerHTML = s;
}

// Hàm lấy danh sách đơn hàng từ localStorage và trả về
function trangThaiDonHang() {
  const layUser = JSON.parse(localStorage.getItem("users"));

  let danhSachDonHang = [];

  layUser.forEach((user) => {
    user.donhang.forEach((donhang) => {
      const donHangMoi = {
        maDon: donhang.ngaymua,
        tenKhach: donhang.sanPham[0].ten,
        diaChi: donhang.sanPham[0].diachi,
        soDienThoai: donhang.sanPham[0].sdt,
        ngayMua: new Date(donhang.ngaymua).toLocaleString(),
        sanPhamList: donhang.sanPham

          .map(
            (sp) =>
              `<li>${sp.tenSanPham} x ${sp.soLuongSanPham} - ${sp.giaSanPham}<sup>đ</sup></li>`
          )
          .join(""),
        tongTien: donhang.sanPham.reduce(
          (total, sp) => total + sp.soLuongSanPham * sp.giaSanPham,
          0
        ),
        ngayMua: new Date(donhang.ngaymua).toLocaleString(), // Ngày mua
        tinhTrang: donhang.tinhTrang, // Tình trạng
      };
      danhSachDonHang.push(donHangMoi);
    });
  });

  return danhSachDonHang;
}

function locDonHangTheoKhoangNgay() {
  const fromDate = new Date(document.getElementById("fromDate").value);
  const toDate = new Date(document.getElementById("toDate").value);
  console.log("Từ ngày: " + fromDate + " đến ngày: " + toDate);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    alert("Vui lòng chọn cả hai ngày!");
    return;
  }

  toDate.setHours(23, 59, 59, 999);

  const listDH = trangThaiDonHang();

  const filteredOrders = listDH.filter((order) => {
    const [day, month, year] = order.ngayMua.split(",")[0].split("/"); // Lấy phần ngày, tháng, năm từ chuỗi
    const orderDate = new Date(`${year}-${month}-${day}`); // Chuyển thành đối tượng Date dạng yyyy-MM-dd
    console.log("Ngày mua : " + orderDate);

    return orderDate >= fromDate && orderDate <= toDate;
  });

  // Hiển thị kết quả tìm kiếm
  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng trong khoảng thời gian từ ${fromDate.toLocaleDateString()} đến ${toDate.toLocaleDateString()}</td></tr>`;
  } else {
    displayFilteredOrders(filteredOrders);
  }
}

function duyetDonHang(maDon, trangThai) {
  const layUser = JSON.parse(localStorage.getItem("users"));

  layUser.forEach((user) => {
    user.donhang.forEach((don) => {
      if (don.ngaymua === maDon) {
        don.tinhTrang = "đã giao hàng";
      }
    });
  });

  localStorage.setItem("users", JSON.stringify(layUser));

  addTableDonHang();

  console.log(`Đơn hàng mã ${maDon} đã giao hàng.`);
}
//--------------------------------------------------------

// function test() {
//   console.log(trangThaiDonHang());
// }
// test();
function createRow(local, index) {
  const colorClass =
    local.tinhTrang === "đã giao hàng" ? "text-success" : "text-warning";
  return `
    <tr class="donhang-row">
      <td>${index + 1}</td>
      <td>${local.maDon}</td>
      <td>${local.tenKhach}</td>
      <td>${local.diaChi}</td>
      <td>${local.soDienThoai}</td>
      
      <td>${local.tongTien
        .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        .replace("₫", "")}<sup>đ</sup></td>

      <td>${local.ngayMua}</td>
      <td class="${colorClass}">${local.tinhTrang}</td>
      <td>
        <button class="btn btn-warning" style="background-color:#15de16;border-color:#15de16;color:#ffffff" onclick="duyetDonHang('${
          local.maDon
        }', true)">Duyệt</button>
        <button class="btn btn-danger" onclick="huyDonHang('${
          local.maDon
        }', false)">Xóa</button>
          <button class="btn btn-info" onclick="chiTietDonHang('${
            local.maDon
          }')">chi tiết đơn</button>
        
      </td>
    </tr>`;
}
let currentPage = 1;
let limit = 4;

let filteredOrders = [];

function loadItems() {
  // Kiểm tra xem đã có bộ lọc nào chưa
  const listDH =
    filteredOrders.length > 0 ? filteredOrders : trangThaiDonHang(); // Dùng danh sách đã lọc nếu có

  const listDHbody = document.getElementsByClassName("table-content")[0];
  listDHbody.innerHTML = "";

  const total = listDH.length;
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  listDH.slice(start, end).forEach((list, index) => {
    const newRow = createRow(list, index + start);
    listDHbody.insertAdjacentHTML("beforeend", newRow);
  });

  renderPagination(total); // Cập nhật phân trang
}

// Function to render pagination buttons
function renderPagination(totalItems) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalItems / limit);
  const maxVisibleButtons = 5;

  // Nút "Previous"
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Trước";
    prevButton.onclick = function () {
      currentPage--;
      loadItems();
    };
    paginationContainer.appendChild(prevButton);
  }

  // Tính toán phạm vi trang hiển thị
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  // Điều chỉnh nếu ở trang đầu hoặc trang cuối
  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  // Nút cho trang đầu tiên và dấu "..."
  if (startPage > 1) {
    const firstPageButton = document.createElement("button");
    firstPageButton.innerText = "1";
    firstPageButton.onclick = function () {
      currentPage = 1;
      loadItems();
    };
    paginationContainer.appendChild(firstPageButton);

    if (startPage > 2) {
      const dots = document.createElement("span");
      dots.innerText = "...";
      paginationContainer.appendChild(dots);
    }
  }

  // Tạo nút cho các trang trong phạm vi hiển thị
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.onclick = function () {
      currentPage = i;
      loadItems();
    };
    paginationContainer.appendChild(pageButton);
  }

  // Nút cho trang cuối cùng và dấu "..."
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement("span");
      dots.innerText = "...";
      paginationContainer.appendChild(dots);
    }

    const lastPageButton = document.createElement("button");
    lastPageButton.innerText = totalPages;
    lastPageButton.onclick = function () {
      currentPage = totalPages;
      loadItems();
    };
    paginationContainer.appendChild(lastPageButton);
  }

  // Nút "Next"
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Sau";
    nextButton.onclick = function () {
      currentPage++;
      loadItems();
    };
    paginationContainer.appendChild(nextButton);
  }
}
// Initial load
window.onload = function () {
  loadItems(); // Gọi khi trang tải lần đầu
};
