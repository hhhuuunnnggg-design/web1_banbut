const productList = document.getElementById("products");

export function drawProducts(filteredProducts) {
  productList.innerHTML = "";
  if (filteredProducts.length === 0) {
    productList.innerHTML =
      "<p>Không tìm thấy sản phầm hoặc sản phẩm đã hết <p>";
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
