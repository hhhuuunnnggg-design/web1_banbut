function test() {
  // Lấy dữ liệu từ localStorage
  const layDsSp = JSON.parse(localStorage.getItem("ListPens"));

  // Kiểm tra dữ liệu
  if (!layDsSp || !Array.isArray(layDsSp)) {
    console.error("Không có dữ liệu trong ListPens hoặc dữ liệu không hợp lệ");
    return;
  }

  // Duyệt qua danh sách sản phẩm
  layDsSp.forEach((item) => {
    console.log(item);

    // Sử dụng querySelector để tìm phần tử với id hoặc data-id
    const ct = document.querySelector(`.product_image[data-id='${item.id}']`);

    // Kiểm tra xem phần tử có tồn tại không
    if (ct) {
      // Gắn sự kiện click cho phần tử
      ct.addEventListener("click", function () {
        console.log("Bạn đã click vào đây, có id là: " + item.id);
      });
    } else {
      console.warn(`Không tìm thấy phần tử với id: ${item.id}`);
    }
  });
}

test();
