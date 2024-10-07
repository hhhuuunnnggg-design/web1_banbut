import { sanpham } from "../../assets/data/data.js";
import { drawProducts } from "../controller/drawProducts.js";
import {
  currentPage,
  paginateProducts,
  setFilteredProducts,
} from "../controller/pagination.js";
import { renderLoaibutList } from "../controller/renderLoaibutList.js";
import { setupSearchEvents } from "../controller/search.js";

const products = sanpham[0].products;
const loaibut = sanpham[0].loaibut;
console.log(products);

// function SaveProductToLocalStorage() {
//   if (localStorage.getItem("ListPens")) {
//     return;
//   }
//   var StringPen = JSON.stringify(products);
//   localStorage.setItem("ListPens", StringPen);
// }
// SaveProductToLocalStorage();
const userLocal = JSON.parse(localStorage.getItem("ListPens")) || [];

if (userLocal.length > 0) {
  drawProducts(userLocal);
} else {
  alert("del có san phảm nào từ localStorage");
}

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
const loaibutList = document.querySelector(".loaibut-list");

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
