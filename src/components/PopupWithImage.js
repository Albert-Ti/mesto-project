import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(item, selector) {
    super(selector);
    this._card = item;
  };

  openImg() {
    super.open();
    super._setEventListeners();
    this._popupImg = document.querySelector('.modal__open-img')
    this._popupImg.src = this._card.link;
    this._popupImg.alt = `Картинка ${this._card.name}`;
    document.querySelector('.modal__text').textContent = this._card.name;
  };
}