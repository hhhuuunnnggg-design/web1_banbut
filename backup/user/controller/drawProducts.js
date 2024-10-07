// drawProducts(currentPage, document.getElementById("searchInput").value);
import { sanpham } from "../../assets/data/data.js";
const products = sanpham[0].products;
const productList = document.getElementById("products");

// Biến trạng thái
let currentPage = 1;
const itemsPerPage = 4; // Số sản phẩm trên mỗi trang

// Lưu sản phẩm vào localStorage nếu chưa có
function SaveProductToLocalStorage() {
  if (!localStorage.getItem("ListPens")) {
    const StringPen = JSON.stringify(products);
    localStorage.setItem("ListPens", StringPen);
  }
}
SaveProductToLocalStorage();

// Hàm tìm kiếm sản phẩm theo từ khóa
function searchProducts(searchTerm) {
  const userLocal = JSON.parse(localStorage.getItem("ListPens")) || [];
  return userLocal.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Hàm tìm kiếm và lọc sản phẩm theo từ khóa và tiêu chí
function searchAndFilterProducts(searchTerm, filterCriteria) {
  const userLocal = JSON.parse(localStorage.getItem("ListPens")) || [];

  // Tìm kiếm theo từ khóa
  let filteredProducts = userLocal.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc theo tiêu chí
  if (filterCriteria === "gia-thap-den-cao") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filterCriteria === "gia-cao-den-thap") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filterCriteria === "giam-gia-nhieu") {
    filteredProducts.sort(
      (a, b) => b.discountPercentage - a.discountPercentage
    );
  }

  return filteredProducts;
}

// Hàm vẽ sản phẩm lên giao diện (cập nhật để nhận tiêu chí tìm kiếm)
export function drawProducts(page = 1, searchTerm = "") {
  // Lấy tiêu chí tìm kiếm từ giao diện
  const filterCriteria = document.getElementById("filter").value;

  let userLocal = searchAndFilterProducts(searchTerm, filterCriteria);
  productList.innerHTML = "";

  if (userLocal.length === 0) {
    productList.innerHTML =
      "<p>Không tìm thấy sản phẩm hoặc sản phẩm đã hết<p>";
    return;
  }

  const totalPages = Math.ceil(userLocal.length / itemsPerPage);
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productsToShow = userLocal.slice(start, end);

  productsToShow.forEach((product) => {
    const productItem = `
      <div class="product_item">
        <div class="product_image">
          <img src="${product.thumbnail}" alt="${product.title}" />
          <div class="product_percent">${product.discountPercentage}%</div>
        </div>
        <div class="product_content">
          <h3 class="product_title">${product.title}</h3>
          <p class="product_description">${product.description}</p>
          <div class="product_meta">
            <div class="product_price">${product.price} $</div>
            <div class="product_stock">${product.stock} sp</div>
            <div class="product_order"><a href="#">Đặt hàng ngay</a></div>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += productItem;
  });

  // Cập nhật nút phân trang
  document.getElementById("paginationNumber").innerText = page;
  document.getElementById("paginationPrev").style.display =
    page === 1 ? "none" : "inline";
  document.getElementById("paginationNext").style.display =
    page === totalPages ? "none" : "inline";
}

// Điều khiển phân trang
document
  .getElementById("paginationPrev")
  .addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      drawProducts(currentPage, document.getElementById("searchInput").value); // Cập nhật tìm kiếm khi phân trang
    }
  });

document
  .getElementById("paginationNext")
  .addEventListener("click", function () {
    currentPage++;
    drawProducts(currentPage, document.getElementById("searchInput").value); // Cập nhật tìm kiếm khi phân trang
  });

// Sự kiện tìm kiếm
document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value; // Lấy giá trị từ input tìm kiếm
  currentPage = 1; // Reset lại trang đầu tiên khi tìm kiếm
  drawProducts(currentPage, document.getElementById("searchInput").value);
});

// Sự kiện nhấn phím Enter trong trường tìm kiếm
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const searchTerm = document.getElementById("searchInput").value; // Lấy giá trị từ input tìm kiếm
      currentPage = 1; //reset lại trang đầu
      drawProducts(currentPage, document.getElementById("searchInput").value);
    }
  });

document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value;
  currentPage = 1;
  drawProducts(currentPage, document.getElementById("searchInput").value);
});

// Sự kiện khi thay đổi bộ lọc
document.getElementById("filter").addEventListener("change", function () {
  drawProducts(currentPage, document.getElementById("searchInput").value);
});

// Khởi tạo trang đầu tiên với tất cả sản phẩm
drawProducts(currentPage);
