function showErrorPlace(formElem, inputElem, settings, errorMessage) {
	const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
	inputElem.classList.add(settings.errorClass);
	errorElem.textContent = errorMessage;
};

function hideErrorPlace(formElem, inputElem, settings) {
	const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
	inputElem.classList.remove(settings.errorClass);
	errorElem.textContent = '';
};


function isValid(formElem, inputElem, settings) {
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

function setEventListeners(formElem, settings) {
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

function checkButtons(inputList) {
	return inputList.some((elem) => {
		return !elem.validity.valid;
	});
};

function toggleButtonState(inputList, buttonElem, settings) {
	if (checkButtons(inputList)) {
		buttonElem.classList.add(settings.inactiveButtonClass);
		buttonElem.setAttribute('disabled', true);
	} else {
		buttonElem.classList.remove(settings.inactiveButtonClass);
		buttonElem.removeAttribute('disabled');
	};
};

function enableValidation(settings) {
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
	enableValidation,
	toggleButtonState,
	checkButtons,
	setEventListeners,
	isValid,
	hideErrorPlace,
	showErrorPlace
};