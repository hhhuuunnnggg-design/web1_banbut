const ten = document.getElementById("name");
const ho = document.getElementById("lname");
const diachi = document.getElementById("address");
const quocgia = document.getElementById("country");
const tinhthanh = document.getElementById("detail");
const sdt = document.getElementById("number");
const email = document.getElementById("Email");

function checkRong() {
  if (
    ten.value === "" ||
    ho.value === "" ||
    diachi.value === "" ||
    quocgia.value === "" ||
    tinhthanh.value === "" ||
    sdt.value === "" ||
    email.value === ""
  ) {
    return false;
  } else {
    return true;
  }
}
export function checkThongTinThanhToan() {
  if (checkRong()) {
    return true;
  } else {
    alert("vui Lòng Nhập đầy đủ thông tin thanh toán");
    return false;
  }
}
