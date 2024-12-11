export function ButtonLeft() {
  const sanpham = JSON.parse(localStorage.getItem("ListPens"));
  const id = JSON.parse(localStorage.getItem("GetID"));
  const index = sanpham.findIndex((sanpham) => sanpham.id == id);
  if (index != -1) {
    const chitietsp = sanpham[index].chitiet[0];
    document.getElementById("ChiTiet").innerHTML = `<table>
      <tr id=row>
          <td class="title">Dòng sản phẩm</td>
          <td>${chitietsp.DongSanPham}</td>
      </tr>
      <tr id=row1>
          <td class="title">Xuất xứ</td>
          <td>${chitietsp.XuatXu}</td>
      </tr>
      <tr id=row>
          <td class="title">Đối tượng</td>
          <td>${chitietsp.DoiTuong}</td>
      </tr>
      <tr id=row1>
          <td class="title">Chất liệu vỏ</td>
          <td>${chitietsp.ChatLieuVo}</td>
      </tr>
      <tr id=row>
          <td class="title">Màu sắc</td>
          <td>${chitietsp.MauSac}</td>
      </tr>
      <tr id=row1>
          <td class="title">Loại ngòi bút</td>
          <td>${chitietsp.LoaiNgoiBut}</td>
      </tr>
      <tr id=row>
          <td class="title">Màu mực mặc định</td>
          <td>${chitietsp.MauMucMacDinh}</td>
      </tr>
      <tr id=row1>
          <td class="title">Phụ kiện đi kèm</td>
          <td>${chitietsp.PhuKienDiKem}</td>
      </tr>
      <tr id=row>
          <td class="title">Bảo hành</td>
          <td>${sanpham[index].returnPolicy}</td>
      </tr>
  </table>`;
  }
}

export function ButtonRight() {
  document.getElementById(
    "ChiTiet"
  ).innerHTML = `<h5>I. ĐỐI VỚI KHÁCH HÀNG TẠI TP.HCM:</h5>
            Đến xem và mua trực tiếp tại 4 địa chỉ như sau: <br>

            ♦ Showroom 1: 91 Hoa Lan, Phường 2, Q. Phú Nhuận, Tp.HCM <br>
            ♦ Showroom 2: 41-43 Đinh Tiên Hoàng, P.Bến Ngé, Q.1, TP.HCM <br>

            Trường hợp Quý khách hàng muốn giao hàng tân nơi:<br>

            ♦ Miễn phí giao hàng đối với đơn hàng trên 2.000.000 đồng.<br>
            ♦ Đơn hàng dưới 2.000.000 đồng thì Chúng tôi sẽ báo phí trực tiếp cho Quý khách tuỳ theo địa chỉ giao
            hàng.<br>
            ♦ Giao hàng trong ngày đối với đơn hàng đặt trước 12h00 chiều. Đơn hàng sau 12h00 thì được chuyển giao hàng
            vào sáng hôm sau.<br>
            ♦ Chỉ nhận giao hàng từ 8h30 - 17h30 từ Thứ 2 - Thứ 6.<br>
            ♦ Trường hợp Quý khách cần gấp có thể chuyển khoản và Thế Giới Bút sẽ book Grab cho Quý khách ngay sau khi
            nhận được tiền.<br>

            <h5>II. ĐỐI VỚI KHÁCH HÀNG Ở TỈNH:</h5>

            Quý khách vui lòng chuyển khoản cho Công ty theo thông tin sau đây:<br>

            ♦ Công ty TNHH TM Quốc Tế Mộc Đức<br>
            ♦ Số tk: 62588588 Ngân hàng ACB – Phòng Giao Dịch Bến Xe Miền Đồng<br>
            [ Số tiền phải chuyển là] : [ tiền hàng ] + [ phí vận chuyển ]<br>

            Phí vận chuyển được tính như sau:<br>

            ♦ Đơn hàng từ 2.000.000 đồng trở lên: miễn phí<br>
            ♦ Đơn hàng dưới 2.000.000 đồng: phí là 30.000 đồng<br>
            ♦ Phí chuyển hàng không phân biệt tỉnh thành, trọng lượng sản phẩm.<br>

            <h5>III. THỜI GIAN XÁC NHẬN ĐƠN HÀNG VÀ GIAO HÀNG</h5>

            ♦ Xác nhận giao hàng: trong vòng 24h00 chúng tôi sẽ liên hệ xác nhận đơn hàng ( trừ thứ 7 và CN)<br>
            ♦ Trong vòng 48h00 kể từ lúc xác nhận đơn hàng bạn sẽ nhận được hàng đối với các tỉnh thành phố lớn như Hà
            Nội, Biên Hoà, Đà Nẳng...<br>
            ♦ Từ 48h00 - 72h00 đối với các tỉnh còn lại.
            ♦ Nếu Quý khách đặt hàng vào thứ 6 thì thời gian hàng sẽ trừ đi thứ 7 và CN ( đơn vị chuyển phát không làm
            việc)<br>

            <h5>IV. MỘT SỐ LƯU LÝ QUAN TRỌNG:</h5>

            ⇒ Vì bút là hàng hóa đặc thù nên hàng mua rồi thì không được đổi hoặc trả lại vì vậy Quý khách phải lựa chọn
            kĩ hoặc gọi điện đến các cửa hàng hoặc số hotline của THẾ GIỚI BÚT để tư vấn và hỗ trợ cụ thể.<br>

            ⇒ Khi chuyển tiền cho chúng tôi, Quý khách ghi nội dung cú pháp như sau:<br>

            [ Mã đơn hàng ] + [ Thanh toán tiền mua bút ]<br>

            ⇒ Mã đơn hàng do hệ thống webside cung cấp tự động khi Quý khách hoàn tất đơn hàng hoặc Email mà THẾ GIỚI
            BÚT gửi cho bạn khi bạn hoàn tất đơn hàng.<br>

            ⇒ Thời gian chuyển tiền: Quý khách vui lòng chuyển trước 15h00 hàng ngày vì sau thời gian trên bên vận
            chuyển không nhận hàng nữa, trường hợp chuyển sau thời gian trên thì ngày hôm sau chúng tôi sẽ chuyển hàng
            cho Quý khách.<br>

            ⇒ Toàn bộ hàng hoá được BH theo chính sách của hãng. Không BH đối với các trường hợp do lỗi người dùng. Thời
            gian BH được ghi cụ thể trong phần thông số KT của từng sản phẩm và trên phiếu BH. Phiếu BH được gửi kèm
            hàng và nằm trong hộp đựng.<br>

            ⇒ Đối với bình mực vì là chất lỏng nên không chuyển theo đường hàng không được vì vậy thời gian giao hàng sẽ
            cộng thêm khoảng 48h00 tùy địa chỉ giao hàng của Quý khách.<br>

            ⇒ Đối tác vận chuyển của chúng tôi là Bưu Chính Viettel, Quý khách có thể tra cứu thông tin về lộ trình đơn
            hàng của mình tại trang chủ của Viettel Post.<br>

            ⇒ Ngoài các phương thức trên, THẾ GIỚI BÚT còn chuyển hàng cho Quý khách thông qua hệ thống xe đi tỉnh tại
            các bến xe, tuy nhiên Quý khách sẽ phải trả thêm cước do nhà xe quy định.<br>

            ⇒ Mọi thông tin hỗ trợ khác xin vui lòng liên hệ số hotline là 0909.692.968 hoặc số điện thoại của các cửa
            hàng để được tư vấn cụ thể hơn.<br>

            Trân trọng!<br></br>`;
}

//Hàm lấy dữ liệu của sp
export function GetItemFromLocalStorage() {
  const sanpham = JSON.parse(localStorage.getItem("ListPens"));
  const id = JSON.parse(localStorage.getItem("GetID"));
  const index = sanpham.findIndex((sanpham) => sanpham.id == id);
  const image = sanpham[index].thumbnail;
  const mota = sanpham[index].MoTa[0];
  document.getElementById("MSP").innerHTML = sanpham[index].id;
  document.getElementById("Name").innerHTML = sanpham[index].title;
  document.getElementById("Price").innerHTML = Number(sanpham[index].price).toLocaleString("vi-VN");
  document.getElementById(
    "Image"
  ).innerHTML = `<img src="${image}" height="466px" alt="" style="margin-top: 100px;"></img>`;
  document.getElementById("Image-Link").innerHTML = image;

  const detailScript = document.querySelector(".detail__script");
  if (detailScript) {
    detailScript.style.marginTop = "20px";
  }

  const description = document.querySelector(".description");
  if (description) {
    description.style.marginTop = "50px";
  }

  document.getElementById("Tieu_de1").innerHTML = `${mota.TieuDe1}   
    <div class="description__MTSP--script_content" id="Noi_dung1">
       ${mota.MoTa1}
        </div>`;
  document.getElementById("Tieu_de2").innerHTML = `${mota.TieuDe2}   
    <div class="description__MTSP--script_content" id="Noi_dung2">
       ${mota.MoTa2}
        </div>`;
  document.getElementById("Tieu_de3").innerHTML = `${mota.TieuDe3}   
    <div class="description__MTSP--script_content" id="Noi_dung3">
       ${mota.MoTa3}
        </div>`;
  document.getElementById("Tieu_de4").innerHTML = `${mota.TieuDe4}   
    <div class="description__MTSP--script_content" id="Noi_dung4">
       ${mota.MoTa4}
        </div>`;
  document.getElementById("Tieu_de5").innerHTML = `${mota.TieuDe5}   
    <div class="description__MTSP--script_content" id="Noi_dung5">
       ${mota.MoTa5}
        </div>`;
  document.getElementById("Tieu_de6").innerHTML = `${mota.TieuDe6}   
    <div class="description__MTSP--script_content" id="Noi_dung6">
       ${mota.MoTa6}
        </div>`;
}