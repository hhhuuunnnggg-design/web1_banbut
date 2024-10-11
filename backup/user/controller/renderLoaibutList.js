import { sanpham } from "../../assets/data/data.js";
import { drawProducts } from "./drawProducts.js";
const ListLoaiBut = sanpham[0].loaibut;

function SaveLoaiButToLocalStorage() {
  if (!localStorage.getItem("ListLoaiBut")) {
    const StringLoaiBut = JSON.stringify(ListLoaiBut);
    localStorage.setItem("ListLoaiBut", StringLoaiBut);
  }
}
SaveLoaiButToLocalStorage();

// Lấy danh sách loại bút từ localStorage
function getLoaiButFromLocalStorage() {
  const listLoaiBut = JSON.parse(localStorage.getItem("ListLoaiBut")) || [];
  return listLoaiBut;
}

// Hàm vẽ danh sách loại bút ra giao diện
function renderLoaiButList() {
  const listLoaiBut = getLoaiButFromLocalStorage();
  const loaiButContainer = document.querySelector(".loaibut-list"); // Chọn container mà danh sách sẽ hiển thị

  loaiButContainer.innerHTML = "";

  listLoaiBut.forEach((loaiBut) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div>${loaiBut.name}</div>`;

    // Thêm sự kiện click cho từng loại bút
    listItem.addEventListener("click", function () {
      searchByLoaiBut(loaiBut.name);
      console.log("bạn đã click vào bút nafy");
    });

    loaiButContainer.appendChild(listItem);
  });
}

// Hàm tìm kiếm theo loại bút mà không cập nhật thanh tìm kiếm
function searchByLoaiBut(loaiButName) {
  drawProducts(1, loaiButName);
}

// Khởi tạo danh sách loại bút khi trang được tải
renderLoaiButList();
