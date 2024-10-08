// login.js

// Xử lý đăng nhập
const formLogin = document.getElementById("formLogin");
const email_dn = document.getElementById("email_dn");
const password_dn = document.getElementById("password_dn");
const alertError = document.getElementById("alertError");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy dữ liệu người dùng từ localStorage (danh sách users)
  const userLocal = JSON.parse(localStorage.getItem("users")) || [];

  // Tìm tài khoản người dùng khớp với email và mật khẩu
  const findAccount = userLocal.find(
    (user) =>
      user.userEmail === email_dn.value &&
      user.userPasWord === password_dn.value
  );

  if (!findAccount) {
    // Nếu không tìm thấy tài khoản, hiển thị cảnh báo lỗi
    alertError.style.display = "block";
  } else {
    // Nếu tìm thấy, lưu trạng thái đăng nhập và tên người dùng vào localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUserName", findAccount.userName);
    localStorage.setItem("loggedInUserEmail", findAccount.userEmail); // Lưu email vào localStorage

    // Chuyển hướng đến trang người dùng
    window.location.href = "index_user.html";
  }
});
