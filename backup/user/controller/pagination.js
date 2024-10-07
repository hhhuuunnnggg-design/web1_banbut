// import { drawProducts } from "./productView.js";

// let currentPage = 1; // Trang hiện tại
// const itemsPerPage = 5; // Số sản phẩm mỗi trang

// export function setupPagination(products) {
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   function updatePagination() {
//     document.getElementById("paginationNumber").innerText = currentPage;
//     document.getElementById("paginationPrev").style.display =
//       currentPage === 1 ? "none" : "inline";
//     document.getElementById("paginationNext").style.display =
//       currentPage === totalPages ? "none" : "inline";
//   }

//   // Gán sự kiện cho nút Prev
//   document
//     .getElementById("paginationPrev")
//     .addEventListener("click", function () {
//       if (currentPage > 1) {
//         currentPage--;
//         drawProducts(products, currentPage, itemsPerPage);
//         updatePagination();
//       }
//     });

//   // Gán sự kiện cho nút Next
//   document
//     .getElementById("paginationNext")
//     .addEventListener("click", function () {
//       if (currentPage < totalPages) {
//         currentPage++;
//         drawProducts(products, currentPage, itemsPerPage);
//         updatePagination();
//       }
//     });

//   // Khởi tạo hiển thị lần đầu
//   drawProducts(products, currentPage, itemsPerPage);
//   updatePagination();
// }
