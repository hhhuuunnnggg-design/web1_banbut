import { drawProducts } from "./drawProducts.js"; // Đảm bảo đường dẫn đúng tới hàm drawProducts

// Khai báo biến toàn cục
let currentPage = 1;
const limitPerPage = 4;
let filteredProducts = []; // Mảng lưu trữ các sản phẩm đã được lọc

// Hàm này cập nhật các sản phẩm đã lọc và reset lại trang hiện tại về trang đầu
export function setFilteredProducts(products) {
  filteredProducts = products; // Cập nhật mảng sản phẩm đã lọc
  currentPage = 1; // Reset lại trang hiện tại về 1 khi có sản phẩm mới được lọc
  updateDisplayCurrentPage(); // Gọi hàm để hiển thị sản phẩm của trang đầu tiên
}

// Hàm này phân trang sản phẩm dựa trên số trang hiện tại và số lượng sản phẩm trên mỗi trang
export function paginateProducts(page = 1) {
  const startIndex = (page - 1) * limitPerPage; // Tính chỉ số bắt đầu của sản phẩm trên trang
  const endIndex = startIndex + limitPerPage; // Tính chỉ số kết thúc của sản phẩm trên trang
  return filteredProducts.slice(startIndex, endIndex); // Trả về các sản phẩm thuộc trang hiện tại
}

// Hàm này cập nhật hiển thị sản phẩm cho trang hiện tại
function updateDisplayCurrentPage() {
  const paginatedProducts = paginateProducts(currentPage); // Lấy các sản phẩm cho trang hiện tại
  drawProducts(paginatedProducts); // Gọi hàm drawProducts để hiển thị các sản phẩm trên trang
  updatePagination(currentPage); // Cập nhật số trang hiện tại trong giao diện người dùng
}

// Hàm này cập nhật số trang hiện tại trong giao diện người dùng
function updatePagination(page) {
  const paginationNumber = document.getElementById("paginationNumber"); // Lấy phần tử hiển thị số trang từ DOM
  paginationNumber.innerHTML = page; // Cập nhật số trang hiện tại vào DOM
}

// Sự kiện khi người dùng nhấn nút "Next" để chuyển sang trang tiếp theo
document
  .getElementById("paginationNext")
  .addEventListener("click", function () {
    // Kiểm tra xem còn sản phẩm nào để hiển thị ở trang tiếp theo không
    if (currentPage * limitPerPage < filteredProducts.length) {
      currentPage++; // Tăng số trang hiện tại lên 1
      updateDisplayCurrentPage(); // Cập nhật lại hiển thị sản phẩm theo trang mới
    }
  });

// Sự kiện khi người dùng nhấn nút "Prev" để quay lại trang trước
document
  .getElementById("paginationPrev")
  .addEventListener("click", function () {
    // Kiểm tra nếu số trang hiện tại lớn hơn 1 (nghĩa là có trang trước để quay lại)
    if (currentPage > 1) {
      currentPage--; // Giảm số trang hiện tại xuống 1
      updateDisplayCurrentPage(); // Cập nhật lại hiển thị sản phẩm theo trang mới
    }
  });
