// (register.js)
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// form đăng ký
const formRegister = document.getElementById("formRegister");
// input dữ liệu(value)
const element_namedk = document.getElementById("namedk");
const element_emaildk = document.getElementById("emaildk");
const element_passworddk = document.getElementById("passworddk");
const element_repassworddk = document.getElementById("repassworddk");
// không được để trống
const userNameError = document.getElementById("userNameError");
const userEmailError = document.getElementById("userEmailError");
const userPasswordError = document.getElementById("userPasswordError");
const reuserPasswordError = document.getElementById("reuserPasswordError");

// Lấy dữ liệu từ LocalStỏage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

// các sự kiện không được thiếu
formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!element_namedk.value) {
    userNameError.style.display = "block";
  } else {
    userNameError.style.display = "none";
  }
  if (!element_emaildk.value) {
    userEmailError.style.display = "block";
  } else {
    userEmailError.style.display = "none";
  }
  if (!element_passworddk.value) {
    userPasswordError.style.display = "block";
  } else {
    userPasswordError.style.display = "none";
  }
  if (!element_repassworddk.value) {
    reuserPasswordError.style.display = "block";
  } else {
    reuserPasswordError.style.display = "none";
  }
  //    kiểm tra mật khẩu với nhập lại mk
  if (element_passworddk.value !== element_repassworddk.value) {
    reuserPasswordError.style.display = "block";
    reuserPasswordError.innerHTML = "mật khẩu không khớp";
  } else {
    reuserPasswordError.style.display = "none";
  }
  //   gửi dữ liệu lên localstore
  if (
    element_namedk.value &&
    element_emaildk.value &&
    element_passworddk.value === element_repassworddk.value
  ) {
    // lấy dữ liệu từ form gộp thành đối tượng user
    const user = {
      userId: Math.ceil(Math.random() * 10000000),
      userName: element_namedk.value,
      userEmail: element_emaildk.value,
      userPasWord: element_passworddk.value,
    };
    //    push user vào trong mảng
    userLocal.push(user);
    // lưu trữ mãng lên localStorage
    localStorage.setItem("users", JSON.stringify(userLocal));
    alert("Bạn đã tạo tài khoảng thành công");
  }
});
