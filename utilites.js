const imagesNodeList = document.querySelectorAll("img");
imagesNodeList.forEach((image) => {
  const src = image.src;
  const imageName = src.split("/").pop();

  fetch(src)
    .then((response) => response.blob())
    .then((blob) => {
      const file = new File([blob], imageName);
      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = imageName;
      link.click();

      URL.revokeObjectURL(url);
    });
});
