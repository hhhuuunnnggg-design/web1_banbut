const tablekhachhang=document.querySelector("#khachhang");
const table5khachhangdoanhthunhieunhat=document.querySelector("#khachhangdoanhthunhieunhat");
const tableMatHang=document.querySelector("#mathang");

document.querySelector("#statistics-form").addEventListener("submit",(event)=>
{
    event.preventDefault();
    onclickThongke();
});

function onclickThongke()
{
    const start=document.querySelector('#start-date').value;
    const end=document.querySelector('#end-date').value;
    if(start==""||end=="")
    {
        alert("Bạn chưa chọn thời gian để thống kê");
        return;
    }
    const startday=new Date(start);
    const endday=new Date(end);

    //-------------------------------------------------------------Thống kê theo khách hàng---------------------------------------------------
    const users=JSON.parse(localStorage.getItem('users'));
    const thongkekhachhang = [];
    users.forEach(user => {
        let tong = 0;

        // Tính tổng doanh thu của mỗi khách hàng
        user.donhang.forEach(donhang => {
            const ngaymuahang=new Date(donhang.ngaymua)
            if (donhang.tinhTrang === "đã giao hàng" && ngaymuahang>=startday && ngaymuahang<=endday) {
                donhang.sanPham.forEach(sanPham => {
                    tong += sanPham.giaSanPham*sanPham.soLuongSanPham;
                });
            }
        });

        // Thêm vào danh sách thống kê
        
            thongkekhachhang.push({
                KhachHang: user.userName,
                TongDoanhThu:tong,
                donhang:user.donhang
            });

        localStorage.setItem("thongke",JSON.stringify(thongkekhachhang));
    });

    // Xóa dữ liệu cũ trong bảng
    tablekhachhang.innerHTML = "";

    
    // Hiển thị dữ liệu thống kê vào bảng
    thongkekhachhang.forEach(thongke => {
        const newRow = `
        <tr>
            <td>${thongke.KhachHang}</td>
            <td>${thongke.TongDoanhThu.toLocaleString("vi-VN", {style:"currency",currency: "VND"})} </td>
            <td><button class="btn btn-info" onclick="openXemHoaDonKH('${thongke.KhachHang}')">Xem các hóa đơn</button></td>
        </tr>`;
        tablekhachhang.insertAdjacentHTML("beforeend", newRow);
        
    });

    


    //------------------------------------------------- Lấy 5 khách hàng đem lại doanh thu nhiều nhất-------------------------------------------
    
    // Sắp xếp thống kê khách hàng theo tổng doanh thu giảm dần
    thongkekhachhang.sort((a, b) => b.TongDoanhThu - a.TongDoanhThu);

    // Xóa dữ liệu cũ trong bảng
    table5khachhangdoanhthunhieunhat.innerHTML = "";
    let i=0;
    while(i<5)
    {
        if(thongkekhachhang[i] )
        {
        const newrow=`
        <tr>
            <td>${thongkekhachhang[i].KhachHang}</td>
            <td>${thongkekhachhang[i].TongDoanhThu.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</td>
            <td><button class="btn btn-info" onclick="openXemHoaDonKH('${thongkekhachhang[i].KhachHang}')">Xem các hóa đơn</button></td>
        </tr>`
        table5khachhangdoanhthunhieunhat.insertAdjacentHTML("beforeend",newrow);
        }
        i++;
    };

    //------------------------------------------------------------ Thống kê theo mặt hàng ----------------------------------------------------
    const thongkemathang=[];
    let tongthutatcamathang=0;
    let banchaynhat='';
    let max=0;
    let banenhat='';
    let min=99999999999999999999999999999999999999999999999;
    const sanpham=JSON.parse(localStorage.getItem('ListPens'));
    sanpham.forEach(sanpham =>{
        const id=`${sanpham.id}`;
        let soluongbanra=0;
        let tongtienthuduoc=0;
        users.forEach(users =>{
            users.donhang.forEach(donhang =>{
                const ngaymuahang=new Date(donhang.ngaymua);
                donhang.sanPham.forEach(sanPham =>{
                    // Kiểm tra nếu sản phẩm trong đơn hàng khớp với sản phẩm đang xét
                    if(id===sanPham.idSanPham && ngaymuahang>=startday && ngaymuahang<=endday) 
                    {
                        soluongbanra+=sanPham.soLuongSanPham;
                    }
                });
            });
        
        });
        
        tongtienthuduoc+=sanpham.price*soluongbanra;
        tongthutatcamathang+=tongtienthuduoc;
        
        thongkemathang.push({
            id:sanpham.id,
            mathang:sanpham.title,
            soluongban:soluongbanra,
            tongtien:tongtienthuduoc
        });
        if(max<soluongbanra)
        {
            max=soluongbanra;
            banchaynhat=sanpham.title;
        }
        if(min>soluongbanra)
        {
            min=soluongbanra;
            banenhat=sanpham.title;
        }
        localStorage.setItem("thongkemathang",JSON.stringify(thongkemathang));
    });

    tableMatHang.innerHTML="";

    thongkemathang.forEach(thongkemathang =>{
        const newRowMatHang=`
        <tr>
            <td>${thongkemathang.mathang}</td>
            <td>${thongkemathang.soluongban}</td>
            <td>${thongkemathang.tongtien.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</td>
            <td><button class="btn btn-info" onclick="openXemHoaDonSP(${thongkemathang.id})">Xem các hóa đơn</button></td>
        </tr>`
        tableMatHang.insertAdjacentHTML("beforeend", newRowMatHang);
    })
    document.getElementById("tongthu").innerHTML=`Tổng Thu: ${tongthutatcamathang.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}`;
    document.getElementById("hangbanchaynhat").innerHTML=`Hàng Bán Chạy Nhất: ${banchaynhat}`;
    document.getElementById("hangbanenhat").innerHTML=`Hàng Ế Nhất: ${banenhat}`;

}

function openXemHoaDonKH(KhachHang)
    {
        const start = document.querySelector('#start-date').value;
        const end = document.querySelector('#end-date').value;
        const startday = new Date(start);
        const endday = new Date(end);
        let tong1donhang=0;
        let tong1sp;
        const thongke=JSON.parse(localStorage.getItem('thongke'));
        const tableHoaDonKH1=document.querySelector("#HoaDonKH");
        const tableHoaDonKH2=document.querySelector("#HoaDonKH");
        const tableHoaDonKH3=document.querySelector("#HoaDonKH");
        tableHoaDonKH1.innerHTML="";
        tableHoaDonKH2.innerHTML="";
        tableHoaDonKH3.innerHTML="";
        thongke.forEach(thongke =>{
            if(thongke.KhachHang==KhachHang)
            {    thongke.donhang.forEach(donhang => {
                    const ngaymuahang=new Date(donhang.ngaymua);
                    if(ngaymuahang>=startday && ngaymuahang<=endday)
                    {
                    //Tính đơn giá
                    const newRowDonhangKH1=`
                    <p style="color:"red""><h1>Mã hóa đơn: ${donhang.ngaymua}</h1></p>
                    <p>Tên khách hàng: ${donhang.sanPham[0].ho} ${donhang.sanPham[0].ten}</p>
                    <p>Địa chỉ khách hàng: ${donhang.sanPham[0].diachi}</p>
                    <p>Email khách hàng: ${donhang.sanPham[0].email}</p>
                    <p>Quốc gia: ${donhang.sanPham[0].quocgia}</p>
                    <p>SĐT: ${donhang.sanPham[0].sdt}</p>                  
                    `;
                    tableHoaDonKH1.insertAdjacentHTML("beforeend",newRowDonhangKH1);
                    const newrowtable=`
                        <table>
                        <thead>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tổng giá tiền sản phẩm</th>                    
                        </thead>
                        </table>`
                    tableHoaDonKH1.insertAdjacentHTML("beforeend",newrowtable);
                    let stt=1;
                    donhang.sanPham.forEach(sanPham =>{
                        
                        tong1sp=Number(sanPham.giaSanPham)*sanPham.soLuongSanPham;
                        tong1donhang+=tong1sp;
                        const newRowDonhangKH2=`
                            <tr>
                            <th>${stt}</th>
                            <th>${sanPham.tenSanPham}</th>  
                            <th>${sanPham.soLuongSanPham}</th>
                            <th>${tong1sp} ₫</th>                    
                            </tr>`
                        tableHoaDonKH2.insertAdjacentHTML("beforeend",newRowDonhangKH2);
                        
                    });
                    tableHoaDonKH3.insertAdjacentHTML("beforeend",`<td>Tổng tiền thanh toán: ${tong1donhang}</td></tr><br></br>`); 
                    stt++;        
                    }    
                });
            }
            });
            
        $('#XemHoaDon').modal('show');
    }

    function openXemHoaDonSP(id){
        const start = document.querySelector('#start-date').value;
        const end = document.querySelector('#end-date').value;
        const startday = new Date(start);
        const endday = new Date(end);
        let check=0;
        let tong1donhang=0;
        let tong1sp;
        const thongke=JSON.parse(localStorage.getItem('thongke')); 
        const tableHoaDonKH1=document.querySelector("#HoaDonKH");
        const tableHoaDonKH2=document.querySelector("#HoaDonKH");
        const tableHoaDonKH3=document.querySelector("#HoaDonKH");
        tableHoaDonKH1.innerHTML="";
        tableHoaDonKH2.innerHTML="";
        tableHoaDonKH3.innerHTML="";
        thongke.forEach(thongke =>{
            thongke.donhang.forEach(donhang => {
                const ngaymuahang=new Date(donhang.ngaymua);
                donhang.sanPham.forEach(sanPham=>{if(Number(sanPham.idSanPham)===id) check+=1;});
                if(check!=0 && ngaymuahang>=startday && ngaymuahang<=endday)
                {//Tính đơn giá
                const newRowDonhangKH1=`
 
                    <p style="color:"red""><h1>Mã hóa đơn: ${donhang.ngaymua}</h1></p>
                    <p>Tên khách hàng: ${donhang.sanPham[0].ho} ${donhang.sanPham[0].ten}</p>
                    <p>Địa chỉ khách hàng: ${donhang.sanPham[0].diachi}</p>
                    <p>Email khách hàng: ${donhang.sanPham[0].email}</p>
                    <p>Quốc gia: ${donhang.sanPham[0].quocgia}</p>
                    <p>SĐT: ${donhang.sanPham[0].sdt}</p>  

                `;
                tableHoaDonKH1.insertAdjacentHTML("beforeend",newRowDonhangKH1);
                const newrowtable=`
                    <table>
                    <thead>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Tổng giá tiền sản phẩm</th>                    
                    </thead>
                    </table>`
                tableHoaDonKH1.insertAdjacentHTML("beforeend",newrowtable);
                let stt=1;
                donhang.sanPham.forEach(sanPham =>{                   
                    tong1sp=Number(sanPham.giaSanPham)*sanPham.soLuongSanPham;
                    tong1donhang+=tong1sp;                   
                    const newRowDonhangKH2=`
                        <tr>
                        <th>${stt}</th>
                        <th>${sanPham.tenSanPham}</th>  
                        <th>${sanPham.soLuongSanPham}</th>
                        <th>${tong1sp} ₫</th>                    
                        </tr>
                    `;
                        
                    tableHoaDonKH2.insertAdjacentHTML("beforeend",newRowDonhangKH2);
                    stt++;
                });
                tableHoaDonKH3.insertAdjacentHTML("beforeend",`<p>Tổng tiền thanh toán: ${tong1donhang} ₫</p><br></br>`);    
                check-=1;   
                }        
            });
        });
            
        $('#XemHoaDon').modal('show');
    }