function locDonHangTheoLoai() {
  const searchOrderType = document.getElementById("searchOrderType").value;
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  switch (searchOrderType) {
    case "ma":
      locDonHangTheoMa(searchInput);
      console.log(`Bạn đang tìm mã đơn với mã: ${searchInput}`);
      // Logic tìm kiếm theo mã đơn (chưa được định nghĩa trong mã hiện tại)
      break;
    case "khachhang":
      locDonHangTheoKhachHang(searchInput);
      console.log(`Bạn đang tìm khách hàng với tên: ${searchInput}`);
      break;
    case "trangThai":
      locDonHangTheoTrangThai(searchInput);
      console.log(`Bạn đang tìm trạng thái với: ${searchInput}`);
      break;
    default:
      console.log("Chọn một phương thức tìm kiếm hợp lệ.");
  }
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
  } else {
    displayFilteredOrders(filteredOrders);
  }
}
function locDonHangTheoMa(searchInput) {
  const listDH = trangThaiDonHang();
  const filteredOrders = listDH.filter((order) =>
    order.maDon.toLowerCase().includes(searchInput)
  );

  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng với tên khách hàng "${searchInput}"</td></tr>`;
  } else {
    displayFilteredOrders(filteredOrders);
  }
}

function locDonHangTheoTrangThai(searchInput) {
  const listDH = trangThaiDonHang(); // Lấy danh sách đơn hàng từ localStorage
  const filteredOrders = listDH.filter(
    (order) => order.tinhTrang.toLowerCase() === searchInput
  );

  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng với trạng thái "${searchInput}"</td></tr>`;
  } else {
    displayFilteredOrders(filteredOrders);
  }
}

function displayFilteredOrders(filteredOrders) {
  const tc = document.getElementsByClassName("table-content")[0];
  let s = ``;

  filteredOrders.forEach((d, index) => {
    // Xác định màu sắc cho trạng thái
    const colorClass =
      d.tinhTrang === "đã giao hàng" ? "text-success" : "text-warning"; // class Bootstrap cho màu xanh và cam

    s += `
          <tr class="donhang-row"> <!-- Class được thêm vào hàng -->
            <td>${index + 1}</td><!-- Số thứ tự -->
            <td>${d.maDon}</td>
            <td>${d.tenKhach}</td>
            <td>${d.diaChi}</td>
            <td>${d.soDienThoai}</td>
            <td><ul>${d.sanPhamList}</ul></td>
            <td>${d.tongTien}<sup>đ</sup></td>
            <td>${d.ngayMua}</td>
            <td class="${colorClass}">${
      d.tinhTrang
    }</td> <!-- Áp dụng màu sắc cho trạng thái -->
            <td>
              <button class="btn btn-warning" style="background-color:#15de16;border-color:#15de16;color:#ffffff" onclick="duyetDonHang('${
                d.maDon
              }', true)">Duyệt</button>
              <button class="btn btn-danger" onclick="huyDonHang('${
                d.maDon
              }', false)">Xóa</button>
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

  // Kiểm tra nếu từ ngày và đến ngày hợp lệ
  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    alert("Vui lòng chọn cả hai ngày!");
    return;
  }

  // Chuyển đổi từ ngày và đến ngày thành dạng timestamp để so sánh
  const listDH = trangThaiDonHang(); // Lấy danh sách đơn hàng từ localStorage
  const filteredOrders = listDH.filter((order) => {
    const orderDate = new Date(order.ngayMua);

    return orderDate >= fromDate && orderDate <= toDate;
  });
  console.log(listDH);
  // Hiển thị kết quả
  if (filteredOrders.length === 0) {
    document.getElementsByClassName(
      "table-content"
    )[0].innerHTML = `<tr><td colspan="10" style="text-align: center;">Không tìm thấy đơn hàng trong khoảng thời gian từ ${fromDate.toLocaleDateString()} đến ${toDate.toLocaleDateString()}</td></tr>`;
  } else {
    displayFilteredOrders(filteredOrders); // Hiển thị đơn hàng đã lọc
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
