const huongdanmuahang =
  document.getElementsByClassName("huong_dan_mua_hang")[0];
const hd = document.getElementById("products");
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = "backup/assets/Bootstrap/Css/font-index4.css";
document.head.appendChild(link);
window.onscroll = function(){
  scrollFuction();
};
function scrollFuction() {
  const btn = document.getElementById("backToTop");
  btn.addEventListener("click", topFunction);
  if (document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}
function topFunction() {
  document.documentElement.scrollTop = 0; 
}
huongdanmuahang.addEventListener("click", function () {
  hd.innerHTML = `
  <style>
  #backToTop{
  position:fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  background-color: #4e5a62;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  display:none;
  }
  #backToTop:hover{
  background-color: #a3b0b7;
  }
    .tutorial {
      max-width: 800px;
      margin: 5px auto;
      padding: 5px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .tutorial h2 {
      font-size: 28px;
      color: #4e5a62;
      margin-bottom: 10px;
    }
    .tutorial__bar {
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, #4e5a62, #e8c22e);
      margin-bottom: 20px;
    }
    .tutorial h3 {
      font-size: 24px;
      color: #6b003e;
      margin: 20px 0 10px;
    }
    .tutorial__detail {
      font-weight: 700;
    }
    .tutorial__highlight {
      font-weight: 700;
      color: #e8c22e;
    }
    .tutorial__diamond {
      list-style-type: none;
      padding-left: 0;
    }
    .tutorial__diamond li {
      position: relative;
      padding-left: 20px;
      margin: 10px 0;
    }
    .tutorial__diamond i {
      position: absolute;
      left: 0;
      top: 0;
      color: #cf2e2e;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    p[style="color: red;"] {
      color: red;
      font-weight: bold;
    }
    .tutorial img {
      width: 100%;
      max-width: 100%;
      height: auto;
      margin: 20px 0;
    }
  </style>
  <div class="tutorial">
      <h2>Hướng dẫn mua hàng tại Thế Giới Bút</h2>
      <div class="tutorial__bar"></div>
        Nhằm mục đích hỗ trợ khách hàng được tốt hơn, Chúng tôi xin hướng dẫn mua bút ký tại Thế Giới Bút với các nội dung sau đây:
      <h3>I. ĐỐI VỚI KHÁCH HÀNG TP.HCM</h3>
      <span class="tutorial--bold">Đến xem và mua trực tiếp hệ thống cửa hàng THẾ GIỚI BÚT với địa chỉ như sau:</span>
      <ul>
        <li> <span class="tutorial__detail">Đại học Sài Gòn</span>, quận 5, đường An Dương Vương</li>
      </ul>
      
      <span class="tutorial--bold">Trường hợp Quý khách hàng muốn giao hàng tận nơi:</span>
      <ul>
        <li>Miễn phí giao hàng với đơn hàng trên <span class="tutorial__highlight">2.000.000</span> đồng. Đơn hàng dưới <span class="tutorial__highlight">2.000.000</span> đồng phí giao hàng được tính theo phí Grab.</li>
        <li>Giao hàng trong ngày đối với các đơn hàng đặt trước 12h00 chiều. Đơn hàng đặt sau 12h00 sẽ được chuyển giao vào sáng hôm sau.</li>
        <li>Chỉ nhận giao hàng từ 8h30 – 17h00 từ Thứ 2 đến Thứ 6.</li>
        <li>Trường hợp Quý khách cần gấp, có thể chuyển khoản cho <span class="tutorial__detail">Thế Giới Bút</span> và chúng tôi sẽ chuyển Grab cho Quý khách ngay sau khi nhận tiền.</li>
      </ul>
      
      <img src="./Images/thumnails/Huong-dan-mua-hang-online-The-Gioi-But.jpg.webp" alt="Mua hàng tại Thế Giới Bút">
      
      <h3>II. ĐỐI VỚI KHÁCH HÀNG Ở TỈNH:</h3>
      
      <h4>TRƯỜNG HỢP CHUYỂN KHOẢN</h4>
      <p>Quý khách vui lòng chuyển khoản vào tài khoản Công ty theo thông tin sau đây:</p>
      <ul class="tutorial__diamond">
        <li><i class="fa-solid fa-diamond"></i> Công ty TNHH TM Quốc Tế Mộc Đức</li>
        <li><i class="fa-solid fa-diamond"></i> Số tk: 62588588 Ngân hàng ACB – Phòng Giao Dịch Bến Xe Miền Đồng</li>
      </ul>
      <p>Tổng số tiền phải chuyển là:</p>
      <p style="color: red;">[ Số tiền phải chuyển là] : [ Tiền hàng ] + [ Phí vận chuyển ]</p>
      
      <h4>TRƯỜNG HỢP NHẬN HÀNG VÀ THANH TOÁN (COD):</h4>
      <p>COD: là hình thức trả tiền khi nhận hàng. Tổng chi phí của đơn hàng của bạn được tính như sau:</p>
      <p style="color: red;">[ Tổng Số tiền ] : [ Tiền hàng ] + [ Phí vận chuyển ] + [ Phí thu hộ ]</p>
      <ul class="tutorial__diamond">
        <li><i class="fa-solid fa-diamond"></i> Tiền hàng: là số tiền trong đơn hàng được niêm yết trên website.</li>
        <li><i class="fa-solid fa-diamond"></i> Phí thu hộ: 0.8% đối với Tỉnh/TP lớn và 1.3% đối với tuyến Huyện/Xã.</li>
        <li><i class="fa-solid fa-diamond"></i> Phí chuyển hàng: phụ thuộc vào trọng lượng & vị trí địa lý của Quý khách. Miễn phí giao hàng đối với đơn hàng trên 5 triệu.</li>
      </ul>
      
      <h3>III. THỜI GIAN XÁC NHẬN ĐƠN HÀNG VÀ GIAO HÀNG</h3>
      <ul>
        <li>Xác nhận giao hàng: trong vòng 24h00 chúng tôi sẽ liên hệ xác nhận đơn hàng (trừ Thứ 7 và Chủ Nhật)</li>
        <li>Trong vòng 48h00 các bạn sẽ nhận được hàng đối với các thành phố lớn như Hà Nội, Đà Nẵng…</li>
        <li>Từ 48h00 – 72h00 đối với các vùng xa, xã hoặc huyện.</li>
        <li>Nếu đặt hàng vào thứ 6 thì thời gian giao hàng sẽ không tính Thứ 7 và CN (do đơn vị chuyển phát không làm việc).</li>
      </ul>
      
      <h3>IV. MỘT SỐ LƯU LÝ QUAN TRỌNG:</h3>
      <ul class="tutorial__diamond">
        <li>→ Vì bút là hàng hóa đặc thù nên hàng mua rồi không được đổi hoặc trả lại. Quý khách phải lựa chọn kỹ hoặc gọi điện đến các cửa hàng hoặc số hotline của THẾ GIỚI BÚT để tư vấn.</li>
        <li>→ Khi chuyển tiền, Quý khách ghi nội dung cú pháp như sau: [ Mã đơn hàng ] + [ Thanh toán tiền mua bút ]</li>
        <li>→ Mã đơn hàng do hệ thống website cung cấp tự động khi Quý khách hoàn tất đơn hàng hoặc email mà THẾ GIỚI BÚT gửi cho bạn khi bạn hoàn tất đơn hàng.</li>
        <li>→ Thời gian chuyển tiền: Quý khách vui lòng chuyển trước 15h00 hàng ngày vì sau thời gian trên bên vận chuyển không nhận nữa.</li>
        <li>→ Đối với bút có khắc laser, Quý khách vui lòng thanh toán trước 100% giá trị đơn hàng.</li>
        <li>→ Toàn bộ hàng hóa được bảo hành theo chính sách của hãng. Không bảo hành đối với các trường hợp do lỗi người dùng (rớt, bể, vỡ, mớp, gãy...).</li>
        <li>→ Đối với bình mực, vì là chất lỏng nên không chuyển theo đường hàng không, thời gian giao hàng sẽ cộng thêm khoảng 48h00 tùy địa chỉ giao hàng của Quý khách.</li>
        <li>→ Đối tác vận chuyển của chúng tôi là <span class="tutorial__detail">Bưu Chính Viettel</span>. Quý khách có thể tra cứu thông tin về lộ trình đơn hàng tại trang chủ của Viettel Post.</li>
      </ul>
    
      <p>Trên đây là một số nội dung hướng dẫn mua bút ký tại Thế Giới Bút. Quý khách cần trợ giúp xin vui lòng liên hệ số hotline: <span class="tutorial__detail">0888.168.968.</span> Xin cảm ơn!</p>
    <button onclick="topFunction()" id="backToTop"><i class="fas fa-arrow-up"></i></button>
      </div>
`;
const btn = document.getElementById("backToTop");
  btn.addEventListener("click", topFunction);
});

