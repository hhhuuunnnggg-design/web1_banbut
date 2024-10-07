//
import { sanpham } from "../../assets/data/data.js";
//  hiện giao diện và phân trang

// Truy cập vào mảng sản phẩm và loại bút từ dữ liệu bạn đã cung cấp
const products = sanpham[0].products;
const loaibut = sanpham[0].loaibut; // Truy cập vào danh sách các loại bút từ sanpham

// Lấy phần tử HTML từ giao diện
const productList = document.getElementById("products");
const paginationNumber = document.getElementById("paginationNumber");
const paginationPrev = document.getElementById("paginationPrev");
const paginationNext = document.getElementById("paginationNext");
const filterSelect = document.getElementById("filter");
const loaibutList = document.querySelector(".loaibut-list");
const loaibutItem = document.querySelector(".loaibut");

// Biến để theo dõi trang hiện tại và giới hạn sản phẩm mỗi trang
let currentPage = 1;
const limitPerPage = 4;
let filteredProducts = [...products]; // Sản phẩm sau khi lọc

// Hàm để tính toán sản phẩm trên trang hiện tại
function paginateProducts(page = 1) {
  const startIndex = (page - 1) * limitPerPage;
  const endIndex = startIndex + limitPerPage;
  return filteredProducts.slice(startIndex, endIndex);
}

// Hàm để tạo HTML cho từng sản phẩm

function drawProducts(filteredProducts) {
  // Xóa nội dung cũ trước khi render
  productList.innerHTML = "";

  // Kiểm tra nếu không có sản phẩm nào sau khi lọc
  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>Không tìm thấy sản phẩm nào 1.</p>";
    return;
  }

  // Duyệt qua từng sản phẩm
  filteredProducts.forEach((product) => {
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
    // Thêm sản phẩm vào danh sách
    productList.innerHTML += productItem;
  });
}

// Cập nhật số trang
function updatePagination(page) {
  paginationNumber.innerHTML = page;
}

// Hiển thị sản phẩm trang hiện tại
function Update_displayCurrentPage() {
  const paginatedProducts = paginateProducts(currentPage);
  drawProducts(paginatedProducts);
  updatePagination(currentPage);
}

// Sự kiện khi nhấn nút "Next"
paginationNext.addEventListener("click", function () {
  if (currentPage * limitPerPage < filteredProducts.length) {
    currentPage++;
    Update_displayCurrentPage();
  }
});

// Sự kiện khi nhấn nút "Prev"
paginationPrev.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    Update_displayCurrentPage();
  }
});

// Gọi hàm ban đầu để hiển thị sản phẩm trang đầu tiên
Update_displayCurrentPage();

// Tìm kiếm sản phẩm
const inputSearch = document.querySelector("#search input");
const buttonSearch = document.querySelector("#search button");

// Hàm tìm kiếm sản phẩm
const search = () => {
  const searchTerm = inputSearch.value.toLowerCase();

  // Lọc sản phẩm dựa trên tiêu đề khớp với từ khóa tìm kiếm
  filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  // Reset về trang đầu khi tìm kiếm
  currentPage = 1;
  Update_displayCurrentPage(); // Hiển thị trang đầu tiên của kết quả tìm kiếm
};

// Sửa lại sự kiện cho nút tìm kiếm
buttonSearch.addEventListener("click", search);

// Xử lý khi nhấn phím Enter trong input
inputSearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search();
  }
});

// Hàm sắp xếp sản phẩm theo tiêu chí
const sortProducts = (criteria) => {
  switch (criteria) {
    case "gia-thap-den-cao":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "gia-cao-den-thap":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "giam-gia-nhieu":
      filteredProducts.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
      break;
    default:
      // Mặc định sắp xếp theo thứ tự ban đầu
      filteredProducts = [...products];
  }
  currentPage = 1;
  Update_displayCurrentPage(); // Cập nhật danh sách sản phẩm theo trang
};

// Sự kiện khi người dùng chọn tiêu chí lọc
filterSelect.addEventListener("change", function (e) {
  sortProducts(e.target.value);
});

// Hàm để tạo các phần tử danh sách loại bút và thêm chức năng lọc theo category
function renderLoaibutList() {
  loaibutList.innerHTML = ""; // Xóa nội dung cũ nếu có

  loaibut.forEach((item) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.textContent = item.name; // Thêm tên loại bút vào div
    div.addEventListener("click", function () {
      filterByCategory(item.name.toLowerCase()); // Lọc sản phẩm theo loại bút
    });
    li.appendChild(div);
    loaibutList.appendChild(li); // Thêm phần tử li vào danh sách loaibut-list
  });
}

// Hàm để lọc sản phẩm theo danh mục (category)
function filterByCategory(category) {
  filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(category)
  );

  // Reset về trang đầu
  currentPage = 1;
  Update_displayCurrentPage(); // Hiển thị sản phẩm đã lọc
}

// Thêm sự kiện mouseenter để hiển thị danh sách các loại bút
loaibutItem.addEventListener("mouseenter", function () {
  renderLoaibutList(); // Vẽ danh sách các loại bút
  loaibutList.style.display = "block"; // Hiển thị danh sách
});

// Thêm sự kiện mouseleave để ẩn danh sách khi không rê chuột nữa
loaibutItem.addEventListener("mouseleave", function () {
  loaibutList.style.display = "none"; // Ẩn danh sách
});
