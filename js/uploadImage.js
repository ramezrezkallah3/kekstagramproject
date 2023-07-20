function uploadImage(){
    const overlayImage = document.getElementsByClassName("img-upload__overlay")
    const inputImage = document.getElementById("upload-file")
    const body = document.getElementsByTagName("body")
    const previewImage = document.getElementsByClassName("img-upload__preview ")[0]
    const uploadCancel = document.getElementById("upload-cancel")

    inputImage.addEventListener("change", () => {
        const image = inputImage.files
        overlayImage[0].classList.remove("hidden");
        body[0].classList.add("modal-open")
        previewImage.children[0].src = `${URL.createObjectURL(image[0])}`
    })

    uploadCancel.addEventListener("click", () => {
        overlayImage[0].classList.add("hidden");
        body[0].classList.remove("modal-open")
    })

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 27)
            overlayImage[0].classList.add("hidden");
            body[0].classList.remove("modal-open")
    })
}

uploadImage();