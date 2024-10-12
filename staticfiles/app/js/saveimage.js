function saveImageFromImgTag(imgId, filename) 
{
    
    var img = document.getElementById(imgId);
    
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;  
    canvas.height = img.naturalHeight;

    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);

    canvas.toBlob(function(blob) 
    {
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;  
        link.click();
       
        URL.revokeObjectURL(link.href);
    }, "image/png");  
}
