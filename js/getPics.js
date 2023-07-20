import { showBigPicture } from "./showPic.js";
import { handleFilteringData } from "./filterData.js";
function createPictureElement(data) {
    const template = document.querySelector('#picture');
    const pictureElement = template.content.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    const likesElement = pictureElement.querySelector('.picture__likes');
  
    imgElement.src = data.url;
    imgElement.alt = data.description;
    commentsElement.textContent = data.comments.length;
    likesElement.textContent = data.likes;
    return pictureElement;
  }
  
  
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then(data => {
      const usersFilters = document.querySelector('.img-filters')
      usersFilters.classList.remove('img-filters--inactive')
      const filterDefaultBtn = document.querySelector("#filter-default")
      const filterSortBtn = document.querySelector("#filter-discussed")
      const filterrRandomBtn = document.querySelector("#filter-random")
      const picturesContainer = document.querySelector('.pictures');

      filterDefaultBtn.addEventListener("click", () => {
        const loadedPics = document.getElementsByClassName('picture')
        filterDefaultBtn.classList.add("img-filters__button--active")
        filterSortBtn.classList.remove("img-filters__button--active")
        filterrRandomBtn.classList.remove("img-filters__button--active")
        while (loadedPics[0]) {
          loadedPics[0].parentNode.removeChild(loadedPics[0]);
        }
        data.forEach(pictureData => {
          const pictureElement = createPictureElement(pictureData);
          picturesContainer.appendChild(pictureElement);
        });

        const pics = document.getElementsByClassName('picture')
        for (let i=0; i < pics.length; i++){
            pics[i].addEventListener("click", () => showBigPicture(data[i]))
        }
      }) 

      filterSortBtn.addEventListener("click", () => {
        const filtereData = handleFilteringData("discussed", data)
        const loadedPics = document.getElementsByClassName('picture')
        filterSortBtn.classList.add("img-filters__button--active")
        filterDefaultBtn.classList.remove("img-filters__button--active")
        filterrRandomBtn.classList.remove("img-filters__button--active")
        while (loadedPics[0]) {
          loadedPics[0].parentNode.removeChild(loadedPics[0]);
        }
        filtereData.forEach(pictureData => {
          const pictureElement = createPictureElement(pictureData);
          picturesContainer.appendChild(pictureElement);
        });

        const pics = document.getElementsByClassName('picture')
        for (let i=0; i < pics.length; i++){
            pics[i].addEventListener("click", () => showBigPicture(data[i]))
        }
      }) 
      filterrRandomBtn.addEventListener("click", () => {
        const filtereData = handleFilteringData("random", data)
        const loadedPics = document.getElementsByClassName('picture')
        filterrRandomBtn.classList.add("img-filters__button--active")
        filterSortBtn.classList.remove("img-filters__button--active")
        filterDefaultBtn.classList.remove("img-filters__button--active")
        while (loadedPics[0]) {
          loadedPics[0].parentNode.removeChild(loadedPics[0]);
        }
        filtereData.forEach(pictureData => {
          const pictureElement = createPictureElement(pictureData);
          picturesContainer.appendChild(pictureElement);
        });

        const pics = document.getElementsByClassName('picture')
        for (let i=0; i < pics.length; i++){
            pics[i].addEventListener("click", () => showBigPicture(data[i]))
        }
      }) 

      
      data.forEach(pictureData => {
        const pictureElement = createPictureElement(pictureData);
        picturesContainer.appendChild(pictureElement);
      });

      const pics = document.getElementsByClassName('picture')
        for (let i=0; i < pics.length; i++){
            pics[i].addEventListener("click", () => showBigPicture(data[i]))
        }
    })
    
    .catch(error => {
      console.log(error);
    })
    .finally( () => {
        
    } 
    );

  const cancelBtn = document.querySelector('.big-picture__cancel') 
  cancelBtn.addEventListener("click", () => {
    const bigPicture = document.querySelector('.big-picture');
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  })
  