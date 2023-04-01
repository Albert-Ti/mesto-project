/************************************************************************/
// Создайте класс PopupWithForm
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitForm }) {
    super(selector);
    this.submitForm = submitForm;
  };

  _getInputValues() {
    this._obj = {};

    this._selector.querySelectorAll('.form__place').forEach(input => {
      this._obj[input.name] = input.value;
    })

    return this._obj;
  };


  setEventListeners() {
    super._setEventListeners();

    this._selector.addEventListener('submit', (evt) => {
      this.submitForm(this._getInputValues(), evt);
    })

    if (this._selector.classList.contains('popup-card')) {
      document.querySelector('.profile__button').addEventListener('click', () => super.open())
    }
    if (this._selector.classList.contains('popup-profile')) {
      document.querySelector('.profile__edit-name-button').addEventListener('click', () => super.open())
    }
    if (this._selector.classList.contains('popup-avatar')) {
      document.querySelector('.profile__avatar').addEventListener('click', () => super.open());
    }
  };
}





