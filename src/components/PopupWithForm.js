import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ selector, submitForm }) {
    super(selector);
    this.submitForm = submitForm;

    this._form = this._popupSelector.querySelector('.form');
    this._inputList = this._popupSelector.querySelectorAll('.form__place');
    this._submitButton = this._popupSelector.querySelector('.form__button');
    this._submitButtonText = this._submitButton.textContent;
  };


  renderLoading(isLoad, isLoadText = 'Сохранение...') {
    if (isLoad) {
      this._submitButton.textContent = isLoadText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }


  _getInputValues() {
    this._obj = {};

    this._inputList.forEach(input => {
      this._obj[input.name] = input.value;
    })
    return this._obj;
  };


  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }



  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.submitForm(this._getInputValues());

      this.renderLoading(true);
    })
  };

  close() {
    super.close();
    this._form.reset();
  }
}
