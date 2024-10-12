from django.http import JsonResponse
from django.shortcuts import render
from PIL import Image
import io
import numpy as np
import base64
import traceback
import cv2

def convert_numpy_to_base64(np_array):
    try:
        image = Image.fromarray(np_array.astype('uint8')) 
        img_byte_arr = io.BytesIO()
        
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        return base64.b64encode(img_byte_arr).decode('utf-8')
    except Exception as e:
        print(f"Error converting NumPy array to base64: {e}")
        raise

def upload_image(request):
    if request.method == 'POST':
        print("Received POST request for image upload.")

        if 'image' not in request.FILES:
            return JsonResponse({'success': False, 'error': 'No image found in request'}, status=400)

        image_file = request.FILES['image']
        print(f"Uploading image: {image_file.name}")

        try:
            image = Image.open(image_file)
            print("Image opened successfully.")

            img_array = np.array(image)
            print("Converted image to NumPy array.")

            noise_image = add_gaussian_noise(img_array)
            denoise_mean_image = denoise_mean(noise_image)
            denoise_median_image = denoise_median(noise_image)
            print("Image processing completed.")

            sharpen_img = sharpen_image(img_array)

            sobel_edges = sobel_edge_detection(img_array)
            prewitt_edges = prewitt_edge_detection(img_array)
            canny_edges = canny_edge_detection(img_array)

            root_image = convert_numpy_to_base64(img_array)
            noise_image_base64 = convert_numpy_to_base64(noise_image)
            denoise_mean_image_base64 = convert_numpy_to_base64(denoise_mean_image)
            denoise_median_image_base64 = convert_numpy_to_base64(denoise_median_image)

            sharpen_img = convert_numpy_to_base64(sharpen_img)
            
            sobel_edges_image = convert_numpy_to_base64(sobel_edges)
            prewitt_edges_image = convert_numpy_to_base64(prewitt_edges)
            canny_edges_image = convert_numpy_to_base64(canny_edges)


            print("Images converted to base64 successfully.")

            # Trả về các ảnh đã xử lý dưới dạng JSON
            return JsonResponse({
                'success': True,
                'message': 'Image processed successfully',
                'root_image': root_image,
                'noise_image': noise_image_base64,
                'denoise_mean_image': denoise_mean_image_base64,
                'denoise_median_image': denoise_median_image_base64,
                'sharpen_img': sharpen_img,
                'sobel_edges_image': sobel_edges_image,
                'prewitt_edges_image': prewitt_edges_image,
                'canny_edges_image':canny_edges_image,
            })

        except Exception as e:
            print(f"Error processing image: {traceback.format_exc()}")
            return JsonResponse({'success': False, 'error': f"Error processing image: {e}"}, status=500)
    return render(request, 'app/index.html')

def main_web(request):
    return render(request, 'app/index.html')

def add_gaussian_noise(image, mean=0, sigma=50):
    gaussian_noise = np.random.normal(mean, sigma, image.shape)
    noisy_image_array = image + gaussian_noise
    noisy_image_array = np.clip(noisy_image_array, 0, 255).astype(np.uint8)
    return noisy_image_array

def denoise_mean(image, kernel_size=3):
    return cv2.blur(image, (kernel_size, kernel_size))

def denoise_median(image, kernel_size=3):
    if kernel_size % 2 == 0:
        kernel_size += 1
    return cv2.medianBlur(image, kernel_size)

def sharpen_image(image_array):
    sharpening_kernel = np.array([[-1, -1, -1],
                                  [-1,  9, -1],
                                  [-1, -1, -1]])
    sharpened_image = cv2.filter2D(src=image_array, ddepth=-1, kernel=sharpening_kernel)
    return sharpened_image


def sobel_edge_detection(image_array):
    gray_image = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
    sobel_x = cv2.Sobel(src=gray_image, ddepth=cv2.CV_64F, dx=1, dy=0, ksize=3)  
    sobel_y = cv2.Sobel(src=gray_image, ddepth=cv2.CV_64F, dx=0, dy=1, ksize=3) 
    sobel_combined = cv2.magnitude(sobel_x, sobel_y)
    sobel_combined = np.uint8(sobel_combined)
    return sobel_combined


def prewitt_edge_detection(image_array):
    gray_image = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
    kernel_x = np.array([[1, 0, -1],
                         [1, 0, -1],
                         [1, 0, -1]])
    
    kernel_y = np.array([[1, 1, 1],
                         [0, 0, 0],
                         [-1, -1, -1]])
    prewitt_x = cv2.filter2D(src=gray_image, ddepth=cv2.CV_64F, kernel=kernel_x)  
    prewitt_y = cv2.filter2D(src=gray_image, ddepth=cv2.CV_64F, kernel=kernel_y)  
    prewitt_combined = np.sqrt(np.square(prewitt_x) + np.square(prewitt_y))
    prewitt_combined = np.uint8(np.absolute(prewitt_combined))
    return prewitt_combined

def canny_edge_detection(image_array):
    gray_image = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
    canny_edges = cv2.Canny(image=gray_image, threshold1=100, threshold2=200)
    return canny_edges

