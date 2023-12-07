"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const userdata = document.getElementById('userdata');

initialData.forEach(review => {
  const userReview = renderReview(review);
  userdata.insertAdjacentHTML('beforeend', userReview);
});

function renderReview(review) {
  return `
    <div class="review">
      <h2>${review.product}</h2>
      <p>${review.reviews[0].text}</p>
      <span class="error-msg"></span>
      <textarea></textarea>
      <button>Добавить отзыв</button>
    </div>
  `;
}

document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const review = button.closest('.review');
    const errorMsg = review.querySelector('.error-msg');
    errorMsg.textContent = '';
    try {
      newReviewRender(review);
    } catch (error) { }
  }
});

function newReviewRender(review) {
  const textarea = review.querySelector('textarea');
  const text = textarea.value;
  try {
    if (text.length < 10) {
      throw new Error('отзыв должен быть не менее 10 символов');
    }
    if (text.length > 500) {
      throw new Error('Отзыв не должен быть длиннее 50 символов');
    }
    const p = document.createElement('p');
    p.classList.add('new-review');
    p.textContent = text;
    review.insertBefore(p, textarea);
    textarea.value = '';
  } catch (error) {
    const errorMsg = review.querySelector('.error-msg');
    errorMsg.textContent = error;
  }
}
