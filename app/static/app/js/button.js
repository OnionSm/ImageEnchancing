
function updateFileName() 
{
    const fileInput = document.getElementById('file-upload'); 
    console.log(fileInput); 

    if (fileInput && fileInput.files.length > 0) 
    {
        console.log(fileInput.files[0]);
        const fileName = fileInput.files[0].name;
        console.log(fileName);

        const fileSizeInBytes = fileInput.files[0].size; 
        const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2); 
        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
        console.log(fileSizeInKB);

        if(fileSizeInMB > 20)
        {
            fileInput.value = "";
            alert('Độ lón ảnh không được vượt quá 20MB!');
            return;
        }
        const fileType = fileInput.files[0].type;
        if (fileType !== "image/jpeg" && fileType !== "image/png" && fileType !== "image/jpg") 
        {
            fileInput.value = "";  
            alert('Chỉ hỗ trợ ảnh có các định dạng JPG, JPEG, PNG!');
            return; 
        }

        const fileInfo = document.getElementsByClassName('file_info')[0]; 
        fileInfo.style.display = 'flex'; 

        const fileInfoElement = document.getElementsByClassName('file_info_size')[0];
        if (fileInfoElement) 
        {
            fileInfoElement.textContent = `Kích thước: ${fileSizeInKB} KB`;
        } 
        else 
        {
            console.error('Phần tử không tìm thấy!');
        }

        document.getElementsByClassName('file_info_name')[0].textContent = fileName; 
        updateImageDisplay(fileInput.files[0]);
    }
}
function showImage() 
{
    var imgElement = document.getElementById('dynamicImage');
    imgElement.src = 'path/to/your/image.jpg'; 
}
function updateImageDisplay(inputElement) 
{
    const imageElement = document.getElementById('dynamicImage');

    if (inputElement !== undefined) 
    {
        const file = inputElement;
        const imageUrl = URL.createObjectURL(file);

        imageElement.src = imageUrl;
        
        imageElement.style.display = 'block';
    }
}

function Execute() {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0]; 

    if (!file) 
    {
        alert('Vui lòng chọn ảnh trước!');
        return;
    }
    
    console.log(file.name);

    const formData = new FormData();
    formData.append('image', file); 

    // Gửi ảnh đến server qua fetch
    fetch('/upload-image/', 
    {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken'), 
        }
    })
    .then(response => 
    {
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(data => {
        if (data.success) 
        {
            console.log("Get dữ liệu thành công");
            document.getElementsByClassName('Denoising_tittle')[0].style.display = "block";
            document.getElementsByClassName('Denoising')[0].style.display = "flex";
            document.getElementById('rootImage').src = `data:image/jpeg;base64,${data.root_image}`;
            document.getElementById('noiseImage').src = `data:image/jpeg;base64,${data.noise_image}`;
            document.getElementById('denoiseMeanImage').src = `data:image/jpeg;base64,${data.denoise_mean_image}`;
            document.getElementById('denoiseMedianImage').src = `data:image/jpeg;base64,${data.denoise_median_image}`;

            document.getElementsByClassName('Sharpening_title')[0].style.display = "block";
            document.getElementsByClassName('Sharpening')[0].style.display = "flex";
            document.getElementById('root_image_sharpening').src = `data:image/jpeg;base64,${data.root_image}`;
            document.getElementById('image_sharpening').src = `data:image/jpeg;base64,${data.sharpen_img}`;

            document.getElementsByClassName('Edge_Detection_Title')[0].style.display = "block";
            document.getElementsByClassName('Edge_Detection')[0].style.display = "flex";
            document.getElementById('sobel_edges_image').src = `data:image/jpeg;base64,${data.sobel_edges_image}`;
            document.getElementById('prewitt_edges_image').src = `data:image/jpeg;base64,${data.prewitt_edges_image}`;
            document.getElementById('canny_edges_image').src = `data:image/jpeg;base64,${data.canny_edges_image}`;

        } 
        else 
        {
            console.error('Upload failed:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}


function getCookie(name) 
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') 
    {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) 
        {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) 
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function cancelFileUpload()
{
    document.getElementById('file-upload').value = "";
    const fileInfo = document.getElementsByClassName('file_info')[0]; 
    fileInfo.style.display = 'none'; 
    document.getElementById('dynamicImage').style.display = "none"
    console.log("File upload canceled.");
}