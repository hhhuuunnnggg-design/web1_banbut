import { sanpham } from "../../assets/data/data.js";
import { drawProducts } from "../controller/drawProducts.js";
const ListLoaiBut = sanpham[0].loaibut;

function SaveLoaiButToLocalStorage() {
  if (!localStorage.getItem("ListLoaiBut")) {
    const StringLoaiBut = JSON.stringify(ListLoaiBut);
    localStorage.setItem("ListLoaiBut", StringLoaiBut);
  }
}
SaveLoaiButToLocalStorage();

function getLoaiButFromLocalStorage() {
  const listLoaiBut = JSON.parse(localStorage.getItem("ListLoaiBut")) || [];
  return listLoaiBut;
}

function renderLoaiButList() {
  const listLoaiBut = getLoaiButFromLocalStorage();
  const loaiButContainer = document.querySelector(".loaibut-list");
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

function searchByLoaiBut(loaiButName) {
  drawProducts(1, loaiButName);
}

renderLoaiButList();
