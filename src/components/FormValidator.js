export default class FormValidator {
  constructor(formElem, data) {
    this._formSelector = formElem;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;

    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonList = this._formSelector.querySelector(this._submitButtonSelector);
  };


  _showErrorPlace(input, errorMessage) {
    this._errorElem = this._formSelector.querySelector(`.${input.id}-error`);
    input.classList.add(this._errorClass);
    this._errorElem.textContent = errorMessage;
  };
  _hideErrorPlace(input) {
    this._errorElem = this._formSelector.querySelector(`.${input.id}-error`);
    input.classList.remove(this._errorClass);
    this._errorElem.textContent = '';
  };


  _isValid(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
    if (!input.validity.valid) {
      this._showErrorPlace(input, input.validationMessage);
    } else {
      this._hideErrorPlace(input);
    };
  };


  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {

        this._isValid(input);
        this._toggleButtonState();
      });
    });

    this._formSelector.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  };


  _checkButtons() {
    return this._inputList.some((elem) => {
      return !elem.validity.valid;
    });
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideErrorPlace(input);
    })
  }


  _toggleButtonState() {
    if (this._checkButtons()) {
      this._buttonList.classList.add(this._inactiveButtonClass);
      this._buttonList.setAttribute('disabled', true);
    } else {
      this._buttonList.classList.remove(this._inactiveButtonClass);
      this._buttonList.removeAttribute('disabled');
    };
  };


  enableValidation() {
    this._setEventListeners();
  };
};


