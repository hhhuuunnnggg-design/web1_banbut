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
  } else if (findAccount.off === true) {
    // Nếu tài khoản bị ban
    alertError.innerHTML = "Tài khoản của bạn đã bị ban.";
    alertError.style.display = "block";
  } else {
    // Nếu tài khoản hợp lệ và không bị ban, lưu trạng thái đăng nhập và tên người dùng vào localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUserName", findAccount.userName);
    localStorage.setItem("loggedInUserEmail", findAccount.userEmail);

    // Chuyển hướng đến trang người dùng
    window.location.href = "index_user.html";
  }
});
// -----------------------
// Giả sử bạn muốn thêm một tài khoản bị ban
const bannedUser = {
  userId: Math.ceil(Math.random() * 10000000),
  userName: "Nguyen Van B",
  userEmail: "nguyenvanb@example.com",
  userPasWord: "h",
  off: true, // Để tài khoản bị ban
  donhang: [],
};

// Thêm người dùng đã bị ban vào danh sách
users.push(bannedUser);

// Cập nhật lại vào localStorage
localStorage.setItem("users", JSON.stringify(users));

// Kiểm tra lại
console.log(JSON.parse(localStorage.getItem("users")));
