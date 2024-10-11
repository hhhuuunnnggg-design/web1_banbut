export function GuiQr() {
  const hd = document.getElementById("products");
  const quetqr = document.querySelector(".submit");
  quetqr.addEventListener("click", function (e) {
    e.preventDefault();
    hd.innerHTML = `
        <div class="course_qr">
            <img
              class="course_qr_img"
              src="https://img.vietqr.io/image/MB-0787495636-qr_only.png"
              alt=""
            />
            <p>số tiền</p>
          </div>

      `;
  });
}
