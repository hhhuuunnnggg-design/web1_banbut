// // Hàm tìm kiếm và lọc sản phẩm theo từ khóa và tiêu chí
// function searchAndFilterProducts(searchTerm, filterCriteria) {
//   const userLocal = JSON.parse(localStorage.getItem("ListPens")) || [];

//   // Tìm kiếm theo từ khóa
//   let filteredProducts = userLocal.filter((product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Lọc theo tiêu chí
//   if (filterCriteria === "gia-thap-den-cao") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//     console.log("giá thấp đến cáo");
//   } else if (filterCriteria === "gia-cao-den-thap") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   } else if (filterCriteria === "giam-gia-nhieu") {
//     filteredProducts.sort(
//       (a, b) => b.discountPercentage - a.discountPercentage
//     );
//   }

//   return filteredProducts;
// }

// // Hàm vẽ sản phẩm lên giao diện (cập nhật để nhận tiêu chí tìm kiếm)
// export function drawProducts(page = 1, searchTerm = "") {
//   // Lấy tiêu chí tìm kiếm từ giao diện
//   const filterCriteria = document.getElementById("filter").value;

//   let userLocal = searchAndFilterProducts(searchTerm, filterCriteria);
//   productList.innerHTML = "";

//   if (userLocal.length === 0) {
//     productList.innerHTML =
//       "<p>Không tìm thấy sản phẩm hoặc sản phẩm đã hết<p>";
//     return;
//   }

//   const totalPages = Math.ceil(userLocal.length / itemsPerPage);
//   if (page < 1) page = 1;
//   if (page > totalPages) page = totalPages;

//   const start = (page - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const productsToShow = userLocal.slice(start, end);

//   productsToShow.forEach((product) => {
//     const productItem = `
//       <div class="product_item">
//         <div class="product_image">
//           <img src="${product.thumbnail}" alt="${product.title}" />
//           <div class="product_percent">${product.discountPercentage}%</div>
//         </div>
//         <div class="product_content">
//           <h3 class="product_title">${product.title}</h3>
//           <p class="product_description">${product.description}</p>
//           <div class="product_meta">
//             <div class="product_price">${product.price} $</div>
//             <div class="product_stock">${product.stock} sp</div>
//             <div class="product_order"><a href="#">Đặt hàng ngay</a></div>
//           </div>
//         </div>
//       </div>
//     `;
//     productList.innerHTML += productItem;
//   });

//   document.getElementById("paginationNumber").innerText = page;
//   document.getElementById("paginationPrev").style.display =
//     page === 1 ? "none" : "inline";
//   document.getElementById("paginationNext").style.display =
//     page === totalPages ? "none" : "inline";
// }

// // Sự kiện khi thay đổi bộ lọc
// document.getElementById("filter").addEventListener("change", function () {
//   drawProducts(currentPage, document.getElementById("searchInput").value);
// });

// // Khởi tạo trang đầu tiên với tất cả sản phẩm
// drawProducts(currentPage);
