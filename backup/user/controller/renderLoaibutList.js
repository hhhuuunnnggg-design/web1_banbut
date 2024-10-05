// renderLoaibutList.js

// Hàm lọc sản phẩm theo danh mục
function filterByCategory(
  category,
  products,
  setFilteredProducts,
  updateDisplayCurrentPage
) {
  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(category)
  );

  // Cập nhật sản phẩm đã lọc
  setFilteredProducts(filteredProducts);
  updateDisplayCurrentPage(); // Hiển thị sản phẩm sau khi lọc
}

// Hàm hiển thị danh sách các loại bút
export function renderLoaibutList(
  loaibut,
  loaibutList,
  products,
  setFilteredProducts,
  updateDisplayCurrentPage
) {
  loaibutList.innerHTML = ""; // Xóa nội dung cũ nếu có

  // Duyệt qua từng loại bút và thêm vào danh sách
  loaibut.forEach((item) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.textContent = item.name; // Thêm tên loại bút vào div

    // Gán sự kiện click để lọc sản phẩm theo loại bút
    div.addEventListener("click", function () {
      filterByCategory(
        item.name.toLowerCase(),
        products,
        setFilteredProducts,
        updateDisplayCurrentPage
      ); // Gọi hàm lọc sản phẩm
    });

    li.appendChild(div);
    loaibutList.appendChild(li); // Thêm phần tử li vào danh sách loaibut-list
  });
}
