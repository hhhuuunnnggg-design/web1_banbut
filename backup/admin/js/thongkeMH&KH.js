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


    //-------------------------------------------------------------Thống kê theo khách hàng---------------------------------------------------
    const users=JSON.parse(localStorage.getItem('users'));
    const thongkekhachhang = [];
    users.forEach(user => {
        let tong = 0;

        // Tính tổng doanh thu của mỗi khách hàng
        user.donhang.forEach(donhang => {
            if (donhang.tinhTrang === "đã giao hàng") {
                donhang.sanPham.forEach(sanPham => {
                    tong += sanPham.giaSanPham*sanPham.soLuongSanPham;
                });
            }
        });

        // Thêm vào danh sách thống kê
            thongkekhachhang.push({
                KhachHang: user.userName,
                TongDoanhThu:tong
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
            <td><button class="btn btn-info">Hóa đơn</button></td>
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
        if(thongkekhachhang[i])
        {
        const newrow=`
        <tr>
            <td>${thongkekhachhang[i].KhachHang}</td>
            <td>${thongkekhachhang[i].TongDoanhThu.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</td>
            <td><button class="btn btn-info">Hóa đơn</button></td>
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
                donhang.sanPham.forEach(sanPham =>{
                    // Kiểm tra nếu sản phẩm trong đơn hàng khớp với sản phẩm đang xét
                    if(id===sanPham.idSanPham)
                    {
                        soluongbanra+=sanPham.soLuongSanPham;
                    }
                });
            });
        
        });
        tongtienthuduoc+=sanpham.price*soluongbanra;
        tongthutatcamathang+=tongtienthuduoc;
        thongkemathang.push({
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
            <td><button class="btn btn-info">Hóa đơn</button></td>
        </tr>`
        tableMatHang.insertAdjacentHTML("beforeend", newRowMatHang);
    })
    document.getElementById("tongthu").innerHTML=`Tổng Thu: ${tongthutatcamathang.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}`;
    document.getElementById("hangbanchaynhat").innerHTML=`Hàng Bán Chạy Nhất: ${banchaynhat}`;
    document.getElementById("hangbanenhat").innerHTML=`Hàng Ế Nhất: ${banenhat}`;

}