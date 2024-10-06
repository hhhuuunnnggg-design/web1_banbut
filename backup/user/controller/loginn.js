// (loginn.js)
const formLogin = document.getElementById("formLogin");
const email_dn = document.getElementById("email_dn");
const password_dn = document.getElementById("password_dn");
const alertError = document.getElementById("alertError");
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  // Lấy dữ liệu từ LocalStỏage
  const userLocal = JSON.parse(localStorage.getItem("users") || []);
  // tìm user và mật khẩu người dùng
  const findAccount = userLocal.find(
    (user) =>
      user.userEmail === email_dn.value &&
      user.userPasWord === password_dn.value
  );
  if (!findAccount) {
    alertError.style.display = "block";
  } else {
    window.location.href = "index_user.html";
  }
});
