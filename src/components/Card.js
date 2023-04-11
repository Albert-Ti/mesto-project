
export default class Card {
  constructor({ api, item, userData, handleCardClick, }, selector) {
    this._api = api;
    this._card = item;
    this._userId = userData._id;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
    this._element = this._getElement();
    this._removeBtn = this._element.querySelector('.element__remove');
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
    this._setEventListeners();

    this._imageCard = this._element.querySelector('.element__image');
    this._imageCard.addEventListener('click', () => this._handleCardClick())

    this._imageCard.src = this._card.link;
    this._imageCard.alt = `Картинка ${this._card.name}`;
    this._element.querySelector('.element__title').textContent = this._card.name;

    // ---убираем иконку удаление у карточек---
    if (this._card.owner._id !== this._userId) this._removeBtn.style.display = 'none';

    return this._element;
  };


  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._userLikes = this._element.querySelector('.element__likes');

    // ---Удаление добавленных карточек:---
    this._removeBtn.addEventListener('click', () => {
      this._api.
        deleteUserCard(this._card._id)
        .then(() => this._element.closest('.element').remove())
        .catch(err => console.log(`Ошибка: ${err}`));
    });

    // ---Лайк добавленных карточек:---
    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('element__like_active')) {
        this._api.addLike(this._card._id)
          .then((check) => {
            check.likes.length === 0 ? this._userLikes.textContent = '' : this._userLikes.textContent = `${check.likes.length}`;
            this._likeButton.classList.add('element__like_active')
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      } else {
        this._api.removeLike(this._card._id)
          .then((check) => {
            check.likes.length === 0 ? this._userLikes.textContent = '' : this._userLikes.textContent = `${check.likes.length}`;
            this._likeButton.classList.remove('element__like_active')
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      };
    });

    // ---отображение колл-во лайков---
    this._card.likes.length === 0 ? this._userLikes.textContent = '' : this._userLikes.textContent = this._card.likes.length;

    // ---отображение иконки лайка пользователя---
    this._card.likes.forEach(like => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('element__like_active');
      } else {
        this._likeButton.classList.remove('element__like_active');
      }
    });
  }
};