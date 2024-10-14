<p align="center">
  <a href="https://www.uit.edu.vn/" title="Trường Đại học Công nghệ Thông tin" style="border: 5;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="Trường Đại học Công nghệ Thông tin | University of Information Technology">
  </a>
</p>
<!-- Title -->
<h1 align="center"><b>Xử lý ảnh và ứng dụng - CS406.P11</b></h1>

<h2>22520375 | Vương Dương Thái Hà</h2>

[Link Github](https://github.com/OnionSm/ImageEnchancing)

### Image Enchancing
<img src = "https://i.imgur.com/aimBlq2.png">
<img src = "https://i.imgur.com/NxsbrmB.png">

### Run
1. [Install Python 3.11.0](https://www.python.org/downloads/release/python-3110/)
2. Tạo Môi Trường Ảo Python
```bash
python -m venv myenv
```

3. Kích hoạt môi trường
Để kích hoạt môi trường ảo Python, bạn có thể sử dụng lệnh sau:
```bash
myenv\Scripts\activate
```
Nếu trong quá trình chạy lệnh mà bạn gặp lỗi, hãy kiểm tra chính sách thực thi bằng cách chạy lệnh sau:
```bash
Get-ExecutionPolicy
```
Nếu kết quả hiển thị là Restricted, hãy thực hiện các bước sau:
Mở PowerShell và chọn “Run as administrator”.
Chạy lệnh sau để thay đổi chính sách thực thi:
```powershell
Set-ExecutionPolicy RemoteSigned
```
Có thông báo như này thì chọn Y
```powershell
Execution Policy Change
The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might expose
you to the security risks described in the about_Execution_Policies help topic at
https:/go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): 
```
Sau đó thử lại lệnh
```bash
myenv\Scripts\activate
```
4. Cài các thư viện cần thiết
Trong file requirements.txt đã có các thư viện cần thiết cho việc thực thi chương trình, chạy lệnh dưới sẽ cài đặt tất cả các thư viện
```
pip install -r requirements.txt
```

5. Thu thập các file static
Trong Django, thu thập (collect) tất cả các tệp tĩnh (static files) từ các ứng dụng vào một thư mục duy nhất.
```
python manage.py collectstatic
```
Nếu có đoạn thông báo dưới này thì nhấn yes
```
This will overwrite existing files!
Are you sure you want to do this?

Type 'yes' to continue, or 'no' to cancel:
```
6. Chạy server local
```
python manage.py runserver 8181
```

7. Truy cập local host
```
http://127.0.0.1:8181/
```



