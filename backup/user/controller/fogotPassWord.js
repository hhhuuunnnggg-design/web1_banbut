// Khởi tạo EmailJS với Public Key của bạn
emailjs.init("e6W6Oy3mKquMwkMxk");

const fogotPassword = document.getElementById("forgotPasswordForm");
const inputEmail = document.getElementById("email");
const users = localStorage.getItem("users");
const arrayuser = JSON.parse(users);

fogotPassword.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Chào email mới: " + inputEmail.value);

  if (inputEmail.value) {
    const findUser = arrayuser.find(
      (user) => user.userEmail === inputEmail.value
    );

    if (findUser) {
      alert("Đã gửi password qua email");

      const emailParams = {
        to_email: findUser.userEmail,
        user_name: findUser.userName,
        message: `Mật khẩu của bạn là: ${findUser.userPasWord}`,
      };

      // Gửi email thông qua EmailJS với Service ID và Template ID
      emailjs.send("service_rd5kbcn", "Template ID", emailParams).then(
        function (response) {
          console.log("Email gửi thành công!", response.status, response.text);
          alert("Đã gửi mật khẩu qua email của bạn!");
        },
        function (error) {
          console.error("Gửi email thất bại...", error);
          alert("Có lỗi xảy ra khi gửi email");
        }
      );
    } else {
      alert("Sai email");
    }
  }
});
