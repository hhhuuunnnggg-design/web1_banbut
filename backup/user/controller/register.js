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

// Lấy dữ liệu từ LocalStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

function reSetInPut() {
  element_namedk.value = "";
  element_emaildk.value = "";
  element_passworddk.value = "";
  element_repassworddk.value = "";
}

function checkTrungEmail(emailInput) {
  const Array_valueUsers = JSON.parse(localStorage.getItem("users")) || [];
  return Array_valueUsers.some((user) => user.userEmail === emailInput);
}

formRegister.addEventListener("submit", function (e) {
  e.preventDefault();

  userNameError.style.display = "none";
  userEmailError.style.display = "none";
  userPasswordError.style.display = "none";
  reuserPasswordError.style.display = "none";

  let isValid = true;

  // Kiểm tra từng trường
  if (!element_namedk.value) {
    userNameError.style.display = "block";
    isValid = false;
  }
  if (!element_emaildk.value) {
    userEmailError.style.display = "block";
    isValid = false;
  } else if (checkTrungEmail(element_emaildk.value)) {
    userEmailError.style.display = "block";
    userEmailError.innerHTML = "Email đã có người sử dụng";
    isValid = false;
  }
  if (!element_passworddk.value) {
    userPasswordError.style.display = "block";
    isValid = false;
  }
  if (!element_repassworddk.value) {
    reuserPasswordError.style.display = "block";
    isValid = false;
  }

  if (element_passworddk.value !== element_repassworddk.value) {
    reuserPasswordError.style.display = "block";
    reuserPasswordError.innerHTML = "Mật khẩu không khớp";
    isValid = false;
  }

  // Nếu tất cả các trường hợp đều hợp lệ, gửi dữ liệu
  if (isValid) {
    const user = {
      userId: Math.ceil(Math.random() * 10000000),
      userName: element_namedk.value,
      userEmail: element_emaildk.value,
      userPasWord: element_passworddk.value,
      off: false,
      donhang: [],
    };

    userLocal.push(user);
    reSetInPut(); // Reset input fields
    localStorage.setItem("users", JSON.stringify(userLocal));
    alert("Bạn đã tạo tài khoản thành công");
  } else {
    alert("Không thể tạo tài khoản do có lỗi");
  }
});

function getCurrentUser() {
  return JSON.parse(window.localStorage.getItem("users"));
}
