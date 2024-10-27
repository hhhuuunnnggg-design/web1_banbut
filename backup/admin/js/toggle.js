let isCollapsed = false; // Biến để theo dõi trạng thái

      document.getElementById("toggleBtn").onclick = function () {
          const box1 = document.getElementById("box1");
          const box2 = document.getElementById("box2");
          const toggleBtn = document.getElementById("toggleBtn");

          if (isCollapsed) {
              // Hiện lại box
              box1.style.display = "flex"; // Hiển thị lại box1
              box2.style.display = "block"; // Hiển thị lại box2
              toggleBtn.innerHTML = "&#x25B6;"; // Đổi nút thành mũi tên sang phải
              toggleBtn.style.left = "250px"; // Vị trí cho mũi tên
          } else {
              // Ẩn cả box1 và box2
              box1.style.display = "none"; // Ẩn box1
              box2.style.display = "none"; // Ẩn box2
              toggleBtn.innerHTML = "&#x25C0;"; // Đổi nút thành mũi tên sang trái
              toggleBtn.style.left = "0px"; // Kéo nút lại gần hơn
          }
          isCollapsed = !isCollapsed; // Đổi trạng thái
        };

        window.onresize = function () {
            if (window.innerWidth < 1300) { // Thay đổi giá trị này nếu cần
                if (!isCollapsed) {
                    document.getElementById("toggleBtn").onclick();
                }
            }
        };