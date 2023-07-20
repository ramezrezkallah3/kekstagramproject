const uploadForm = document.querySelector('.img-upload__form');
var hashtagInput = document.querySelector('.text__hashtags')
var descriptionInput = document.querySelector('.text__description')
var submitBtn = document.querySelector('#upload-submit')
const overlayImage = document.getElementsByClassName("img-upload__overlay")
const body = document.getElementsByTagName("body")
const inputImage = document.getElementById("upload-file")
uploadForm.addEventListener('submit', handleSubmit);

hashtagInput.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});
descriptionInput.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

function handleSubmit(event) {
  event.preventDefault(); 

  const errorTemplate = document.createElement("div");
  errorTemplate.setAttribute('id', 'error');
  errorTemplate.innerHTML = ` <section class="error">
                                <div class="error__inner">
                                  <h2 class="error__title">Ошибка загрузки файла</h2>
                                  <button type="button" class="error__button">Загрузить другой файл</button>
                                </div>
                              </section>`;

  if (hashtagInput.value.length > 0){
    var hashtags = hashtagInput.value.trim();
    var hashtagArray = hashtags.toLowerCase().split(' ');

    if (hashtagArray.length > 5) {
      alert('Нельзя указать больше пяти хэш-тегов');
      return;
    }
    var uniqueHashtags = [];
    for (var i = 0; i < hashtagArray.length; i++) {
      var hashtag = hashtagArray[i];
      if (hashtag.length > 20) {
        alert('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        return;
      }
      if (!/^#[a-zA-Z0-9]+$/.test(hashtag)) {
        alert('Хэш-тег начинается с символа # и может содержать только буквы и числа');
        return;
      }
      if (uniqueHashtags.includes(hashtag)) {
        alert('Один и тот же хэш-тег не может быть использован дважды');
        return;
      }
      uniqueHashtags.push(hashtag);
    }
    }
  
    if (descriptionInput.value.length > 0){
      if (descriptionInput.value.length > 140) {
        alert('длина комментария не может составлять больше 140 символов');
        return;
      }
      }
    
  submitBtn.disabled = true;
  const formData = new FormData(uploadForm);

  const successTemplate = document.createElement("div");
  successTemplate.setAttribute('id', 'success');
  successTemplate.innerHTML = `<section class="success">
                                  <div class="success__inner">
                                    <h2 class="success__title">Изображение успешно загружено</h2>
                                    <button type="button" class="success__button">Круто!</button>
                                  </div>
                               </section>`;

  
  fetch('https://26.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        document.body.appendChild(successTemplate);
        overlayImage[0].classList.add("hidden");
        body[0].classList.remove("modal-open")
        var successButton = document.querySelector('.success__button');
        successButton.addEventListener('click', removeSuccessMessage);
        inputImage.files = null
        inputImage.value =''
      } else {
        const overlayImage1 = document.getElementsByClassName("img-upload__overlay")[0]
        overlayImage1.style.zIndex = "1";
        document.body.appendChild(errorTemplate);
        var errorButton = document.querySelector('.error__button');
        errorButton.addEventListener('click', removeErrorMessage);
      }
    })
    .catch((error) => {
        const overlayImage1 = document.getElementsByClassName("img-upload__overlay")[0]
        overlayImage1.style.zIndex = "1"
        document.body.appendChild(errorTemplate);
        var errorButton = document.querySelector('.error__button');
        errorButton.addEventListener('click', removeErrorMessage);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
  
    const removeSuccessMessage = () => {
    document.body.removeChild(successTemplate)
    };
  
    const removeerrorMessage = () => {
      document.body.removeChild(errorTemplate)
      };
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        removeSuccessMessage();
      }
    });

    const removeErrorMessage = () => {
      document.body.removeChild(errorTemplate)
      };
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          removeerrorMessage();
        }
      });
  
}
