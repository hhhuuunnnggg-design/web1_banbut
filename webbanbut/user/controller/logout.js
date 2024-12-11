


document.getElementById("btnLogout").addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("loggedInUserEmail"); 
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUserName");
  alert("Bạn đã đăng xuất thành công!");
  window.location.href = "login_logout.html";
});
