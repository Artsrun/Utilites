(()=>{
  
const imagesNodeList = document.querySelectorAll("img");
imagesNodeList.forEach((image) => {
    const src = image.src;
    const imageName = src.split("/").pop().split("?")[0];  // Remove the part after ?
    fetch(src)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const timestamp = new Date().getTime();
            const fileNameParts = imageName.split('.');
            const fileExtension = fileNameParts.pop();
            const fileName = fileNameParts.join('.');
            const modifiedFileName = `${fileName}_${timestamp}.${fileExtension}`;
            link.download = modifiedFileName;
            link.click();
        })
        .catch(console.error);
});


})()
