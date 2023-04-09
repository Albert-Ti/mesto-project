import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._popupImg = document.querySelector('.modal__open-img');
    this._popupImgText = document.querySelector('.modal__text');
  };

  open(data) {
    super.open();

    this._popupImg.src = data.link;
    this._popupImg.alt = `Картинка ${data.name}`;
    this._popupImgText.textContent = data.name;
  };
}