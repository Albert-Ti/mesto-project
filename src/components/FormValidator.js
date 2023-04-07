export default class FormValidator {
  constructor(data) {
    this._formSelector = document.querySelectorAll(data.formSelector);
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;
  };


  _showErrorPlace(formElem, inputElem, errorMessage) {
    const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._errorClass);
    errorElem.textContent = errorMessage;
  };
  _hideErrorPlace(formElem, inputElem) {
    const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._errorClass);
    errorElem.textContent = '';
  };


  _isValid(formElem, inputElem) {
    if (inputElem.validity.patternMismatch) {
      inputElem.setCustomValidity(inputElem.dataset.errorMessage);
    } else {
      inputElem.setCustomValidity('');
    }
    if (!inputElem.validity.valid) {
      this._showErrorPlace(formElem, inputElem, inputElem.validationMessage);
    } else {
      this._hideErrorPlace(formElem, inputElem);
    };
  };


  _setEventListeners(formElem) {
    const inputList = Array.from(formElem.querySelectorAll(this._inputSelector));
    const buttonList = formElem.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonList);

    inputList.forEach((inputElem) => {
      inputElem.addEventListener('input', () => {
        this._isValid(formElem, inputElem);
        this._toggleButtonState(inputList, buttonList);
      });
    });

    formElem.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonList);
      }, 0);
    });
  };


  _checkButtons(inputList) {
    return inputList.some((elem) => {
      return !elem.validity.valid;
    });
  };


  _toggleButtonState(inputList, buttonElem) {
    if (this._checkButtons(inputList)) {
      buttonElem.classList.add(this._inactiveButtonClass);
      buttonElem.setAttribute('disabled', true);
    } else {
      buttonElem.classList.remove(this._inactiveButtonClass);
      buttonElem.removeAttribute('disabled');
    };
  };


  enableValidation() {
    this._formSelector.forEach((formElem) => {
      this._setEventListeners(formElem);
    });
  };
};


