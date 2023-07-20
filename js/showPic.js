function showBigPicture(data) {
    const bigPicture = document.querySelector('.big-picture');
    const imgElement = bigPicture.querySelector('.big-picture__img img');
    const captionElement = bigPicture.querySelector('.social__caption');
    const likesCountElement = bigPicture.querySelector('.likes-count');
    const commentsCountElement = bigPicture.querySelector('.comments-count');
    const commentsListElement = bigPicture.querySelector('.social__comments');
    const loader = document.querySelector(".social__comments-loader");
    loader.classList.remove("hidden");
    
    `
    <li class="social__comment">
              <img class="social__picture" src="img/avatar-4.svg" alt="Аватар комментатора фотографии" width="35" height="35">
              <p class="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
    </li>
    `
    imgElement.src = data.url;
    imgElement.alt = data.description;
    captionElement.textContent = data.description;
    likesCountElement.textContent = data.likes;
    commentsCountElement.textContent = data.comments.length;

    loader.addEventListener("click", () => {
      commentsListElement.innerHTML = ''
      data.comments.forEach(comment => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');
        commentElement.innerHTML = `
          <img class="social__picture" src="${comment.avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
          <p class="social__text">${comment.message}</p>`;

        commentsListElement.appendChild(commentElement);
        loader.classList.add("hidden")
    })
  })
  
    if (data.comments){
      commentsListElement.innerHTML = ''
      const comments = data.comments.slice(0,5)
      comments.forEach(comment => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');
        commentElement.innerHTML = `
          <img class="social__picture" src="${comment.avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
          <p class="social__text">${comment.message}</p>`;

        commentsListElement.appendChild(commentElement);
      });
    }

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }

export {showBigPicture}