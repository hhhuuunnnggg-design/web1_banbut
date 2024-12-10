let currentPage = 1;
let limit = 4;
let filteredOrders = [];

// Hàm lấy danh sách đơn hàng từ localStorage
function trangThaiDonHang() {
  const layUser = JSON.parse(localStorage.getItem("users")) || [];
  let danhSachDonHang = [];

  layUser.forEach((user) => {
    user.donhang.forEach((donhang) => {
      const donHangMoi = {
        maDon: donhang.ngaymua,
        tenKhach: donhang.sanPham[0].ten,
        diaChi: donhang.sanPham[0].diachi,
        soDienThoai: donhang.sanPham[0].sdt,
        ngayMua: new Date(donhang.ngaymua).toLocaleString(),
        tongTien: donhang.sanPham.reduce(
          (total, sp) => total + sp.soLuongSanPham * sp.giaSanPham,
          0
        ),
        tinhTrang: donhang.tinhTrang,
      };
      danhSachDonHang.push(donHangMoi);
    });
  });

  return danhSachDonHang;
}

// Tìm kiếm theo khoảng ngày
function locDonHangTheoKhoangNgay() {
  const fromDate = new Date(document.getElementById("fromDate").value);
  const toDate = new Date(document.getElementById("toDate").value);

  console.log("Từ ngày: " + fromDate + " đến ngày: " + toDate);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    alert("Vui lòng chọn cả hai ngày!");
    return;
  }

  // Đặt thời gian của `toDate` đến cuối ngày
  toDate.setHours(23, 59, 59, 999);

  const listDH = trangThaiDonHang();

  // Lọc đơn hàng theo khoảng ngày
  filteredOrders = listDH.filter((order) => {
    const ngayMuaParts = order.ngayMua.split(",")[0].split("/"); // Tách ngày, tháng, năm
    const [day, month, year] = ngayMuaParts; // Lấy từng phần
    const orderDate = new Date(`${year}-${month}-${day}`); // Chuyển thành đối tượng Date dạng yyyy-mm-dd

    console.log("Ngày mua : " + orderDate);

    return orderDate >= fromDate && orderDate <= toDate;
  });

  // Hiển thị kết quả tìm kiếm
  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng trong khoảng thời gian từ ${fromDate.toLocaleDateString()} đến ${toDate.toLocaleDateString()}</td></tr>`;
    document.getElementById("pagination").innerHTML = ""; // Xóa phân trang nếu không có kết quả
  } else {
    currentPage = 1; // Reset trang về 1
    loadItems(); // Hiển thị lại dữ liệu đã lọc
  }
}

// Tìm kiếm theo loại (mã, tên khách hàng, trạng thái)
function locDonHangTheoLoai() {
  const searchOrderType = document.getElementById("searchOrderType").value;
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const listToFilter =
    filteredOrders.length > 0 ? filteredOrders : trangThaiDonHang();

  switch (searchOrderType) {
    case "ma":
      filteredOrders = listToFilter.filter((order) =>
        order.maDon.toLowerCase().includes(searchInput)
      );
      break;
    case "khachhang":
      filteredOrders = listToFilter.filter((order) =>
        order.tenKhach.toLowerCase().includes(searchInput)
      );
      break;
    case "trangThai":
      filteredOrders = listToFilter.filter(
        (order) => order.tinhTrang.toLowerCase() === searchInput
      );
      break;
    default:
      console.log("Chọn một phương thức tìm kiếm hợp lệ.");
      return;
  }

  if (filteredOrders.length === 0) {
    document.getElementsByClassName("table-content")[0].innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng theo tiêu chí tìm kiếm.</td>
      </tr>`;
    document.getElementById("pagination").innerHTML = "";
  } else {
    currentPage = 1;
    loadItems();
  }
}

// Hiển thị dữ liệu với phân trang
function loadItems() {
  const listDH =
    filteredOrders.length > 0 ? filteredOrders : trangThaiDonHang();
  const listDHbody = document.getElementsByClassName("table-content")[0];
  listDHbody.innerHTML = "";

  const total = listDH.length;
  const start = (currentPage - 1) * limit;
  const end = Math.min(start + limit, total);

  listDH.slice(start, end).forEach((list, index) => {
    const newRow = createRow(list, index + start);
    listDHbody.insertAdjacentHTML("beforeend", newRow);
  });

  renderPagination(total);
}

// Hàm hiển thị phân trang
function renderPagination(totalItems) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalItems / limit);
  const maxVisibleButtons = 5;

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Trước";
    prevButton.onclick = function () {
      currentPage--;
      loadItems();
    };
    paginationContainer.appendChild(prevButton);
  }

  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

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

// Tạo hàng đơn hàng
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
      <td>${local.tongTien.toLocaleString("vi-VN")}<sup>đ</sup></td>
      <td>${local.ngayMua}</td>
      <td class="${colorClass}">${local.tinhTrang}</td>
      <td>
        <button class="btn btn-success" onclick="duyetDonHang('${
          local.maDon
        }', true)">Duyệt</button>
        <button class="btn btn-danger" onclick="huyDonHang('${
          local.maDon
        }', false)">Xóa</button>
        <button class="btn btn-info" onclick="chiTietDonHang('${
          local.maDon
        }')">Chi tiết</button>
      </td>
    </tr>`;
}

// Initial load
window.onload = function () {
  loadItems();
};
