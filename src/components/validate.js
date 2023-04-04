const showErrorPlace = (formElem, inputElem, settings, errorMessage) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.add(settings.errorClass);
  errorElem.textContent = errorMessage;
};

const hideErrorPlace = (formElem, inputElem, settings) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(settings.errorClass);
  errorElem.textContent = '';
};


const isValid = (formElem, inputElem, settings) => {
  if (inputElem.validity.patternMismatch) {
    inputElem.setCustomValidity(inputElem.dataset.errorMessage);
  } else {
    inputElem.setCustomValidity('');
  }
  if (!inputElem.validity.valid) {
    showErrorPlace(formElem, inputElem, settings, inputElem.validationMessage);
  } else {
    hideErrorPlace(formElem, inputElem, settings);
  };
};

const setEventListeners = (formElem, settings) => {
  const inputList = Array.from(formElem.querySelectorAll(settings.inputSelector));
  const buttonList = formElem.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonList, settings);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem, settings);
      toggleButtonState(inputList, buttonList, settings);
    });
  });

  formElem.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonList, settings);
    }, 0);
  });
};

const checkButtons = (inputList) => {
  return inputList.some((elem) => {
    return !elem.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElem, settings) => {
  if (checkButtons(inputList)) {
    buttonElem.classList.add(settings.inactiveButtonClass);
    buttonElem.setAttribute('disabled', true);
  } else {
    buttonElem.classList.remove(settings.inactiveButtonClass);
    buttonElem.removeAttribute('disabled');
  };
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElem) => {
    setEventListeners(formElem, settings);
  });
};
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__place',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__place_active-error'
});

export {
  enableValidation
};