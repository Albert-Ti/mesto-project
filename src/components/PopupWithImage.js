
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);
    this._card = data;
  };

  openImg() {
    super.open();
    super._setEventListeners();
    document.querySelector('.modal__open-img').src = this._card.link;
    document.querySelector('.modal__open-img').alt = `Картинка ${this._card.name}`;
    document.querySelector('.modal__text').textContent = this._card.name;
  };
}