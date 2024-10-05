import { sanpham } from "../../assets/data/data.js";
import { drawProducts } from "../controller/drawProducts.js";
import {
  paginateProducts,
  setFilteredProducts,
} from "../controller/pagination.js"; // Import hàm paginateProducts
import { renderLoaibutList } from "../controller/renderLoaibutList.js";
import { setupSearchEvents } from "../controller/search.js";

const products = sanpham[0].products;
const loaibut = sanpham[0].loaibut; // Danh sách các loại bút

drawProducts(products);
setFilteredProducts(products); // Thiết lập sản phẩm để phân trang và hiển thị

// Hàm cập nhật hiển thị trang hiện tại
function updateDisplayCurrentPage() {
  const paginatedProducts = paginateProducts(currentPage); // Sử dụng paginateProducts để lấy sản phẩm phân trang
  drawProducts(paginatedProducts); // Gọi lại hàm drawProducts để cập nhật sản phẩm
}

// Lấy các phần tử DOM cần thiết
const inputSearch = document.querySelector("#search input");
const buttonSearch = document.querySelector("#search button");
const filterSelect = document.getElementById("filter");
const loaibutList = document.querySelector(".loaibut-list"); // Phần tử danh sách loại bút

// Thiết lập sự kiện tìm kiếm
setupSearchEvents(products, inputSearch, buttonSearch, filterSelect);

// Hiển thị danh sách các loại bút
renderLoaibutList(
  loaibut,
  loaibutList,
  products,
  setFilteredProducts,
  updateDisplayCurrentPage
);
