// Hàm để thêm biểu đồ
function addChart(id, chartOption) {
  var ctx = document.getElementById(id);
  if (!ctx) {
    console.error(`Không tìm thấy phần tử với id: ${id}`);
    return;
  }
  ctx = ctx.getContext("2d");
  var chart = new Chart(ctx, chartOption);
}

// Lấy màu ngẫu nhiên
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Hàm để tạo danh sách màu ngẫu nhiên
function getListRandomColor(length) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push(getRandomColor());
  }
  return result;
}

// Hàm để tạo cấu hình biểu đồ
function createChartConfig(label, type, labels, data, colors) {
  return {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: colors,
          borderColor: colors.map((color) => {
            return color.replace("0.2", "1");
          }),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
}

// Hàm lấy thông tin đơn hàng và vẽ biểu đồ
function getListDonHangs() {
  const layUser = JSON.parse(localStorage.getItem("users"));

  if (!Array.isArray(layUser) || layUser.length === 0) {
    console.error("Không có dữ liệu đơn hàng hợp lệ!");
    return;
  }

  var thongKeHang = {}; // Thống kê hãng

  layUser.forEach((donHang) => {
    // Kiểm tra xem donHang có thuộc tính `sanPham`
    if (!donHang.donhang || !Array.isArray(donHang.donhang)) {
      console.error("Dữ liệu đơn hàng không hợp lệ!", donHang);
      return;
    }

    donHang.donhang.forEach((sanPhamTrongDonHang) => {
      if (
        !sanPhamTrongDonHang.sanPham ||
        !Array.isArray(sanPhamTrongDonHang.sanPham)
      ) {
        console.error("Dữ liệu sản phẩm không hợp lệ!", sanPhamTrongDonHang);
        return;
      }

      sanPhamTrongDonHang.sanPham.forEach((item) => {
        let tenHang = item.tenSanPham || "Sản phẩm không tên";
        let soLuong = item.soLuongSanPham || 0;
        let donGia = Number(item.giaSanPham) || 0; // Chuyển giá từ string sang số
        let thanhTien = soLuong * donGia;

        console.log(tenHang + " " + soLuong + " " + donGia + " " + thanhTien);

        if (!thongKeHang[tenHang]) {
          thongKeHang[tenHang] = {
            soLuongBanRa: 0,
            doanhThu: 0,
          };
        }

        thongKeHang[tenHang].soLuongBanRa += soLuong;
        thongKeHang[tenHang].doanhThu += thanhTien;
      });
    });
  });

  if (Object.keys(thongKeHang).length === 0) {
    console.error("Không có dữ liệu để vẽ biểu đồ!");
    return;
  }

  // Lấy mảng màu ngẫu nhiên để vẽ đồ thị
  let colors = getListRandomColor(Object.keys(thongKeHang).length);

  // Thêm biểu đồ thống kê Số lượng bán ra
  addChart(
    "myChart1",
    createChartConfig(
      "Số lượng bán ra",
      "bar",
      Object.keys(thongKeHang),
      Object.values(thongKeHang).map((_) => _.soLuongBanRa),
      colors
    )
  );

  // Thêm biểu đồ thống kê Doanh thu
  addChart(
    "myChart2",
    createChartConfig(
      "Doanh thu",
      "doughnut",
      Object.keys(thongKeHang),
      Object.values(thongKeHang).map((_) => _.doanhThu),
      colors
    )
  );
}

// Gọi hàm để vẽ biểu đồ
getListDonHangs();
