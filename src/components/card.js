
export default class Card {
  constructor({ api, item, userId, handleCardClick }, selector) {
    this._api = api;
    this._card = item;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
  };


  _getElement() {
    const cardItem = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardItem;
  };


  generateCard() {
    this._element = this._getElement();
    this._handleCardClick();
    this._setEventListeners();

    const imageCard = this._element.querySelector('.element__image');

    imageCard.src = this._card.link;
    imageCard.alt = `Картинка ${this._card.name}`;
    this._element.querySelector('.element__title').textContent = this._card.name;

    // ---убираем иконку удаление у карточек---
    if (this._card.owner._id !== this._userId) this._element.querySelector('.element__remove').style.display = 'none';

    return this._element;
  };


  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like');
    const userLikes = this._element.querySelector('.element__likes');

    // ---Удаление добавленных карточек:---
    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._api.
        deleteUserCard(this._card._id)
        .then(() => this._element.closest('.element').remove())
        .catch(err => console.log(`Ошибка: ${err}`));
    });

    // ---Лайк добавленных карточек:---
    likeButton.addEventListener('click', () => {
      if (!likeButton.classList.contains('element__like_active')) {
        this._api.addLike(this._card._id)
          .then((check) => {
            check.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = `${check.likes.length}`;
            likeButton.classList.add('element__like_active')
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      } else {
        this._api.removeLike(this._card._id)
          .then((check) => {
            check.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = `${check.likes.length}`;
            likeButton.classList.remove('element__like_active')
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      };
    });

    // ---отображение колл-во лайков---
    this._card.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = this._card.likes.length;

    // ---отображение иконки лайка пользователя---
    this._card.likes.forEach(like => {
      if (like._id === this._userId) {
        likeButton.classList.add('element__like_active');
      } else {
        likeButton.classList.remove('element__like_active');
      }
    });
  }
};