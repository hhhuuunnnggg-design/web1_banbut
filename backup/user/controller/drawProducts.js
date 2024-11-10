import { sanpham } from "../../assets/data/data.js";
import {
  layDsItemGioHang,
  luuDSvaoStorage,
  taoGioHang,
} from "../controller/gioHang.js";
import {
  ButtonLeft,
  ButtonRight,
  GetItemFromLocalStorage,
} from "../GUI/chiTietSanPham.js";
import { drawcartGui } from "./cartGui.js";

const products = sanpham[0].products;
const productList = document.getElementById("products");

let currentPage = 1;
const itemsPerPage = 4;

function SaveProductToLocalStorage() {
  if (!localStorage.getItem("ListPens")) {
    const StringPen = JSON.stringify(products);
    localStorage.setItem("ListPens", StringPen);
  }
}
SaveProductToLocalStorage();

// Hàm tìm kiếm và lọc sản phẩm theo từ khóa và tiêu chí
function searchAndFilterProducts(
  searchTerm,
  filterCriteria,
  minPrice,
  maxPrice
) {
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

  // Lọc theo giá min và max
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }
  return filteredProducts;
}

// Hàm vẽ sản phẩm lên giao diện (cập nhật để nhận tiêu chí tìm kiếm)
export function drawProducts(page = 1, searchTerm = "") {
  // Lấy tiêu chí tìm kiếm từ giao diện
  const filterCriteria = document.getElementById("filter").value;

  // Lấy giá min và max từ input
  const minPrice =
    parseFloat(document.getElementById("searchPriceMin").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("searchPriceMax").value) || Infinity;

  let userLocal = searchAndFilterProducts(
    searchTerm,
    filterCriteria,
    minPrice,
    maxPrice
  );
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
    const formattedPrice = Number(product.price).toLocaleString("vi-VN");
    const productItem = `
      <div class="product_item">
        <div class="product_image">
          <img src="${product.thumbnail}" alt="${product.title}" />
          
        </div>
        <div class="product_content">
          <h3 class="product_title">${product.title}</h3>
          <p class="product_description">${product.description}</p>
          <div class="product_meta">
            <div class="product_price">${formattedPrice} vnđ</div>
           
            <div class="product_order">
              <button class="addToCart" data-id="${product.id}" 
                      data-img="${product.thumbnail}" 
                      data-title="${product.title}"
                      data-price="${product.price}"
                      >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div class="product_detail">
            <a href="#">
            <button class="ChiTietSP" data-id="${product.id}"
                      data-img="${product.thumbnail}" 
                      data-title="${product.title}"
                      data-price="${product.price}">Chi tiết sản phẩm</button>
            </div>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += productItem;
  });
  //vẽ cập nhật phân trang
  updatePagination(page, totalPages);

  //Gán sự kiện onclick cho các nút "Chi tiết sản phẩm" và lấy mã sản phẩm từ thuộc tính `data-id`
  document.querySelectorAll(".ChiTietSP").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute("data-id");
      localStorage.setItem("GetID", JSON.stringify(productId));
      document.getElementById(
        "detail"
      ).innerHTML = `  <div class="container_ctsp">
      <div class="detail">
        <div id="Image-Link"></div>
        <div class="detail__img" id="Image">
          
        </div>
        <div class="detail__script">
          <div class="detail__script--msp" id="MSP">
            MSP: W0SR-0001
          </div>
          <div class="detail__script--name" id="Name">
            Viết Waterman Serénité Air
          </div>
          <div class="detail__script--price" id="Price">
            100.000.000 ₫
          </div>VND
          <div class="detail__script--notice">
            Liên hệ để biết tình trạng sản phẩm
          </div>
          <div class="bottom">
            <button class="bottom__MuaHang">
              Mua ngay
            </button>
            <button class="bottom__GioHang" id="bottom_GioHang" >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div class="TuyChon">
            <div class="TuyChon__header" style="display: flex;">
  
              <div style="width: 50%;">
              <button id="button-left" style="width: 100%;" ><h4> Thông tin sản phẩm</h4></button>
              </div>
              <div style="width: 50%;">
              <button id="button-right" style="width: 100%;"><h4> Hướng dẫn mua hàng</h4></button>
              </div>            
            </div>
  
            <div class="TuyChon__script" id="ChiTiet">
  
            </div>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="description__MTSP--header">
          <h1>Mô tả sản phẩm</h1>
        </div>
        <div class="description__MTSP--script" id="Tieu_de1">
          <div class="description__MTSP--script_content" id="Noi_dung1">
         
          </div>
        </div>
        <div class="description__MTSP--script" id="Tieu_de2">
          <div class="description__MTSP--script_content" id="Noi_dung2">
         
          </div>
        </div>
        <div class="description__MTSP--script" id="Tieu_de3">
          <div class="description__MTSP--script_content" id="Noi_dung3">
         
          </div>
        </div>
        <div class="description__MTSP--script" id="Tieu_de4">
          <div class="description__MTSP--script_content" id="Noi_dung4">
         
          </div>
        </div>
        <div class="description__MTSP--script" id="Tieu_de5">
          <div class="description__MTSP--script_content" id="Noi_dung5">
         
          </div>
        </div>
        <div class="description__MTSP--script" id="Tieu_de6">
          <div class="description__MTSP--script_content" id="Noi_dung6">
         
          </div>
        </div>
      </div>
    </div>`;
      GetItemFromLocalStorage();
      ButtonLeft();
      document
        .getElementById("button-right")
        .addEventListener("click", ButtonRight);
      document
        .getElementById("button-left")
        .addEventListener("click", ButtonLeft);

      document
        .getElementById("bottom_GioHang")
        .addEventListener("click", function () {
          const productId = document.getElementById("MSP").innerText;
          const imgSanPham = document.getElementById("Image-Link").innerText;
          const tenSanPham = document.getElementById("Name").innerText;
          const giaSanPham = document.getElementById("Price").innerText;

          onclickDuaVaoGioHang(productId, imgSanPham, tenSanPham, giaSanPham);
        });
    });
  });

  // Gán sự kiện onclick cho các nút "Thêm vào giỏ hàng" và lấy mã sản phẩm từ thuộc tính `data-id`
  document.querySelectorAll(".addToCart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute("data-id");
      const imgSanPham = button.getAttribute("data-img");
      const tenSanPham = button.getAttribute("data-title");
      const giaSanPham = button.getAttribute("data-price");

      onclickDuaVaoGioHang(productId, imgSanPham, tenSanPham, giaSanPham);
    });
  });

  // Cập nhật nút phân trang
  function updatePagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    const maxVisibleButtons = 5;

    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerText = "Trước";
      prevButton.onclick = function () {
        currentPage--;
        drawProducts(currentPage, document.getElementById("searchInput").value);
      };
      paginationContainer.appendChild(prevButton);
    }

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      const firstPageButton = document.createElement("button");
      firstPageButton.innerText = "1";
      firstPageButton.onclick = function () {
        currentPage = 1;
        drawProducts(currentPage, document.getElementById("searchInput").value);
      };
      paginationContainer.appendChild(firstPageButton);
      if (startPage > 2) {
        const dots = document.createElement("span");
        dots.innerText = "...";
        paginationContainer.appendChild(dots);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerText = i;
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.onclick = function () {
        currentPage = i;
        drawProducts(currentPage, document.getElementById("searchInput").value);
      };
      paginationContainer.appendChild(pageButton);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement("span");
        dots.innerText = "...";
        paginationContainer.appendChild(dots);
      }
      const lastPageButton = document.createElement("button");
      lastPageButton.innerText = totalPages;
      lastPageButton.onclick = function () {
        currentPage = totalPages;
        drawProducts(currentPage, document.getElementById("searchInput").value);
      };
      paginationContainer.appendChild(lastPageButton);
    }

    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerText = "Sau";
      nextButton.onclick = function () {
        currentPage++;
        drawProducts(currentPage, document.getElementById("searchInput").value);
      };
      paginationContainer.appendChild(nextButton);
    }
  }
}
// Sự kiện tìm kiếm
document.getElementById("searchButton").addEventListener("click", function (e) {
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
      document.getElementsByClassName("tim_gia")[0].style.display = "block";
      drawProducts(currentPage, searchTerm);
    }
  });

document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value;
  document.getElementsByClassName("tim_gia")[0].style.display = "block";
  currentPage = 1;
  drawProducts(currentPage, searchTerm);
});

//  tìm kiếm giá min đến max
document
  .getElementById("searchButtonPrice")
  .addEventListener("click", function () {
    const PriceMax = document.getElementById("searchPriceMax").value;
    const PriceMin = document.getElementById("searchPriceMin").value;
    console.log(PriceMin + " và " + PriceMax);
    currentPage = 1; // Reset lại trang đầu tiên khi tìm kiếm
    drawProducts(currentPage, document.getElementById("searchInput").value);
  });

// Sự kiện khi thay đổi bộ lọc
document.getElementById("filter").addEventListener("change", function () {
  drawProducts(currentPage, document.getElementById("searchInput").value);
});
// giỏ hànga
// Hàm xử lý khi người dùng click "Thêm vào giỏ hàng"
function onclickDuaVaoGioHang(idsanpham, imgSanPham, tenSanPham, giaSanPham) {
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn === "false") {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
    window.location.href = "./login_logout.html";
    return;
  }

  // Lấy email của người dùng hiện tại từ localStorage
  var currentUserEmail = localStorage.getItem("loggedInUserEmail");
  if (!currentUserEmail) {
    alert("Lỗi: không thể xác định người dùng. Vui lòng đăng nhập lại.");
    return;
  }

  // Lấy giỏ hàng hiện tại của người dùng
  var dsItemgiohang = layDsItemGioHang(); // Hàm lấy giỏ hàng của người dùng từ localStorage
  var coTonTai = false;
  for (var i = 0; i < dsItemgiohang.length; i++) {
    var gioHienTai = dsItemgiohang[i];
    if (gioHienTai.idSanPham == idsanpham) {
      dsItemgiohang[i].soLuongSanPham++;
      coTonTai = true;
    }
  }
  if (!coTonTai) {
    var itemGioHang = taoGioHang(
      idsanpham,
      imgSanPham,
      tenSanPham,
      giaSanPham,
      1
    );
    dsItemgiohang.push(itemGioHang);
  }

  // Lưu giỏ hàng riêng của người dùng vào localStorage
  luuDSvaoStorage(dsItemgiohang);
  alert("Sản phẩm đã được thêm vào giỏ hàng.");
  drawcartGui();
}

drawProducts(currentPage);
