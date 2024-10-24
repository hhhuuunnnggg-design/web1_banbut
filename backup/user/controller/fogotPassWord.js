const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const inputEmail = document.getElementById("email");
const users = localStorage.getItem("users");
const arrayUser = JSON.parse(users || "[]");

// var public ="e6W6Oy3mKquMwkMxk";
var sericeID = "service_rd5kbcn";
var templateID = "template_xkqcnrd";

forgotPasswordForm.addEventListener("submit", function (e) {
  emailjs.init("e6W6Oy3mKquMwkMxk");
  e.preventDefault();

  console.log("Chào email mới: " + inputEmail.value);
  console.log("Dữ liệu người dùng:", arrayUser); // Kiểm tra dữ liệu người dùng

  if (inputEmail.value) {
    const findUser = arrayUser.find(
      (user) => user.userEmail === inputEmail.value
    );

    if (findUser) {
      const emailParams = {
        to_email: findUser.userEmail,
        user_name: findUser.userName,
        message: `Mật khẩu của bạn là: ${findUser.userPasWord}`,
      };

      emailjs.send(sericeID, templateID, emailParams).then(
        function (response) {
          console.log("Email gửi thành công!", response.status, response.text);
          alert("Đã gửi mật khẩu qua email của bạn!");
        },
        function (error) {
          console.error("Gửi email thất bại...", error);
          alert("Có lỗi xảy ra khi gửi email: " + JSON.stringify(error));
        }
      );
    } else {
      alert("Sai email");
    }
  } else {
    alert("Vui lòng nhập email");
  }
});
