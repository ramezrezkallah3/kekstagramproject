function scaleImage(){
    const scaleDownBtn = document.getElementsByClassName("scale__control--smaller")[0]
    const scaleUpBtn = document.getElementsByClassName("scale__control--bigger")[0]
    const scaleValueInput = document.getElementsByClassName("scale__control--value")[0]
    const previewImage = document.getElementsByClassName("img-upload__preview ")[0]

    scaleDownBtn.addEventListener("click", () => {
        const scaleVlaue = +scaleValueInput.value.slice(0, -1)
        if (scaleVlaue > 0){
            scaleValueInput.value = `${scaleVlaue - 25}%`
        }
        previewImage.style.transform = `scale(${+scaleValueInput.value.slice(0, -1)/100})` 
    })

    scaleUpBtn.addEventListener("click", () => {
        const scaleVlaue = +scaleValueInput.value.slice(0, -1)
        if (scaleVlaue < 100){
            scaleValueInput.value = `${scaleVlaue + 25}%`
        }
        previewImage.style.transform = `scale(${+scaleValueInput.value.slice(0, -1)/100})` 
    })
}

scaleImage();