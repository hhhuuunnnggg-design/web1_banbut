import { setFilteredProducts } from "./pagination.js"; // Import hàm cập nhật sản phẩm đã lọc

// Hàm tìm kiếm sản phẩm theo tên
export const searchByName = (products, searchTerm) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Hàm sắp xếp sản phẩm theo tiêu chí
export const sortProducts = (products, criteria) => {
  switch (criteria) {
    case "gia-thap-den-cao":
      return [...products].sort((a, b) => a.price - b.price);
    case "gia-cao-den-thap":
      return [...products].sort((a, b) => b.price - a.price);
    case "giam-gia-nhieu":
      return [...products].sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
    default:
      return products;
  }
};

// Hàm xử lý tìm kiếm tổng quát
export const handleSearch = (products, searchTerm, criteria) => {
  console.log("Search Term:", searchTerm);
  let filteredProducts = searchByName(products, searchTerm);
  filteredProducts = sortProducts(filteredProducts, criteria);

  // Cập nhật sản phẩm đã lọc cho phân trang
  console.log("Filtered Products:", filteredProducts);
  setFilteredProducts(filteredProducts); // Sử dụng setFilteredProducts để cập nhật sản phẩm
};

// Hàm thiết lập sự kiện cho tìm kiếm
export const setupSearchEvents = (
  products,
  inputSearch,
  buttonSearch,
  filterSelect
) => {
  // Sự kiện khi nhấn nút tìm kiếm
  buttonSearch.addEventListener("click", () => {
    const searchTerm = inputSearch.value; // Lấy giá trị từ input tìm kiếm
    const criteria = filterSelect.value; // Lấy giá trị từ dropdown tiêu chí
    handleSearch(products, searchTerm, criteria); // Gọi hàm tìm kiếm
  });

  // Xử lý khi nhấn phím Enter trong input
  inputSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      buttonSearch.click(); // Gọi sự kiện nhấn nút tìm kiếm
    }
  });

  // Sự kiện khi người dùng chọn tiêu chí lọc
  filterSelect.addEventListener("change", () => {
    const searchTerm = inputSearch.value; // Lấy giá trị từ input tìm kiếm
    const criteria = filterSelect.value; // Lấy giá trị từ dropdown tiêu chí
    handleSearch(products, searchTerm, criteria); // Gọi hàm tìm kiếm
  });
};
