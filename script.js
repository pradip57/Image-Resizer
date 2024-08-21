document.getElementById("resizeBtn").addEventListener("click", resizeImage);

function resizeImage() {
  const fileInput = document.getElementById("uploadImage").files[0];
  const widthInput = document.getElementById("width").value;
  const heightInput = document.getElementById("height").value;
  const canvas = document.getElementById("canvas");
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput || !widthInput || !heightInput) {
    alert("Please select an image and enter dimensions");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      canvas.width = widthInput;
      canvas.height = heightInput;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, widthInput, heightInput);

      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.style.display = "inline-block";
      }, "image/png");
    };
  };
  reader.readAsDataURL(fileInput);
}
