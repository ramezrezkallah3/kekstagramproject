
const radiosItem = document.getElementsByClassName("effects__item")
const radiosList = document.getElementsByClassName("effects__list")[0]
const radios = document.getElementsByClassName("radio")
const previewImage = document.getElementsByClassName("img-upload__preview ")[0]

const effectRadios = document.querySelectorAll('.effects__radio');
var slider = document.querySelector('.effect-level__slider');
const effectField = document.querySelectorAll('.img-upload__effect-level')[0]
effectField.style.visibility = "hidden";

var effect;
noUiSlider.create(slider, {
  start: 100, 
  step: 1, 
  range: {
    min: 0, 
    max: 100 
  }
});

function changeEffect(){
  effectRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const selectedEffect = radio.value;
      effect = selectedEffect
      updateImageStyles(100);
      slider.noUiSlider.set(100);
      if (effect === "none"){
        effectField.style.visibility = "hidden";
      } else {
        effectField.style.visibility = "visible";
      }
      previewImage.className = `img-upload__preview effects__preview--${selectedEffect}`;
    })
  });
}

changeEffect();

function updateImageStyles(value) {
  var effectType = effect; 
  changeEffect();
  switch (effectType) {
    case 'chrome':
      previewImage.style.filter = 'grayscale(' + (value / 100) + ')';
      break;
    case 'sepia':
      previewImage.style.filter = 'sepia(' + (value / 100) + ')';
      break;
    case 'marvin':
      previewImage.style.filter = 'invert(' + value + '%)';
      break;
    case 'phobos':
      previewImage.style.filter = 'blur(' + (value / 10) + 'px)';
      break;
    case 'heat':
      previewImage.style.filter = 'brightness(' + (value / 100) + ')';
      break;
    case 'none':
      previewImage.style.filter = 'none';
      break;
    }

  var valueField = document.querySelector('.effect-level__value');
  valueField.value = value;
}

slider.noUiSlider.on('change', function (values, handle) {
  var value = parseInt(values[handle], 10)
  updateImageStyles(value)
});