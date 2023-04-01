// Создайте класс Popup
export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  };

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  };

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  };

  _setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      };
    });
  };
};
