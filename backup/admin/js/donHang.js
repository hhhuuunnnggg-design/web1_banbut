// Hàm thêm bảng đơn hàng vào giao diện
function addTableDonHang() {
  const tc = document.getElementsByClassName("table-content")[0]; // Vùng để hiển thị bảng
  let s = `<table class="table-outline hideImg">`; // Bắt đầu tạo bảng

  const listDH = quanlydonhang(); // Lấy danh sách đơn hàng
  let tongTienTatCa = 0; // Biến lưu tổng tiền của tất cả đơn hàng

  // Duyệt qua từng đơn hàng
  for (let i = 0; i < listDH.length; i++) {
    const d = listDH[i];
    // Xác định màu sắc cho trạng thái
    const colorClass =
      d.tinhTrang === "đã giao hàng" ? "text-success" : "text-warning"; // class Bootstrap cho màu xanh và cam

    s += `
    <tr class="donhang-row"> <!-- Class được thêm vào hàng -->
      <td>${i + 1}</td><!-- Số thứ tự -->
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
    </tr>
  `;
    tongTienTatCa += d.tongTien;
  }

  s += `</table>`;
  tc.innerHTML = s;

  // const footer = document.querySelector(".table-footer");
  // footer.innerHTML = `<p>Tổng tiền của tất cả đơn hàng: ${tongTienTatCa}<sup>đ</sup></p>`;
}

// Hàm lấy thông tin đơn hàng từ localStorage và trả về danh sách
function quanlydonhang() {
  const layUser = JSON.parse(localStorage.getItem("users"));
  let danhSachDonHang = [];

  // Duyệt qua từng user trong danh sách
  layUser.forEach((user) => {
    user.donhang.forEach((don) => {
      let tongTienDon = 0;
      let danhSachSanPham = "";

      don.sanPham.forEach((sanpham) => {
        const tenSp = sanpham.tenSanPham;
        const soLuong = sanpham.soLuongSanPham;
        const giaSp = Number(sanpham.giaSanPham);
        const thanhTien = soLuong * giaSp;
        tongTienDon += thanhTien;

        danhSachSanPham += `<li>${tenSp} x ${soLuong} - ${thanhTien}<sup>đ</sup></li>`;
      });

      const tenKh = don.sanPham[0].ten;
      const diachiKh = don.sanPham[0].diachi;
      const sdtKh = don.sanPham[0].sdt;

      const donHangMoi = {
        maDon: don.ngaymua,
        tenKhach: tenKh,
        diaChi: diachiKh,
        soDienThoai: sdtKh,
        sanPhamList: danhSachSanPham,
        tongTien: tongTienDon,
        ngayMua: new Date(don.ngaymua).toLocaleString(),
        tinhTrang: don.tinhTrang,
      };

      danhSachDonHang.push(donHangMoi);
    });
  });

  return danhSachDonHang;
}

// Hàm duyệt đơn hàng
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

// Hàm hủy đơn hàng
function huyDonHang(maDon, trangThai) {
  const layUser = JSON.parse(localStorage.getItem("users"));
  let isDeleted = false;

  layUser.forEach((user) => {
    user.donhang = user.donhang.filter((don) => {
      if (don.ngaymua === maDon) {
        if (don.tinhTrang === "đã giao hàng") {
          alert("Đơn hàng đã giao hàng, bạn không thể xóa nó!");
          return true;
        } else {
          isDeleted = true;
          return false;
        }
      }
      return true;
    });
  });

  if (isDeleted) {
    localStorage.setItem("users", JSON.stringify(layUser));

    addTableDonHang();
    console.log(`Đơn hàng mã ${maDon} đã được hủy.`);
  }
}

// Gọi hàm hiển thị bảng đơn hàng khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  addTableDonHang();
});
