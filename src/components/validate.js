function showErrorPlace(formElem, inputElem, errorMessage) {
	const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
	inputElem.classList.add('form__place_active-error');
	errorElem.textContent = errorMessage;
};

function hideErrorPlace(formElem, inputElem) {
	const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
	inputElem.classList.remove('form__place_active-error');
	errorElem.textContent = '';
};


function isValid(formElem, inputElem) {
	if (inputElem.validity.patternMismatch) {
		inputElem.setCustomValidity(inputElem.dataset.errorMessage);
	} else {
		inputElem.setCustomValidity('');
	}
	if (!inputElem.validity.valid) {
		showErrorPlace(formElem, inputElem, inputElem.validationMessage);
	} else {
		hideErrorPlace(formElem, inputElem);
	};
};

function setEventListeners(formElem) {
	const inputList = Array.from(formElem.querySelectorAll('.form__place'));
	const buttonList = formElem.querySelector('.form__button');
	toggleButtonState(inputList, buttonList);
	inputList.forEach((inputElem) => {
		inputElem.addEventListener('input', () => {
			isValid(formElem, inputElem);
			toggleButtonState(inputList, buttonList);
		});
	});
};

function checkButtons(inputList) {
	return inputList.some((elem) => {
		return !elem.validity.valid;
	});
};

function toggleButtonState(inputList, buttonElem) {
	if (checkButtons(inputList)) {
		buttonElem.classList.add('form__button_inactive');
		buttonElem.setAttribute('disabled', true);
	} else {
		buttonElem.classList.remove('form__button_inactive');
		buttonElem.removeAttribute('disabled');
	};
};

function enableValidation() {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElem) => {
		setEventListeners(formElem);
	});
};
enableValidation();

export {
	enableValidation,
	toggleButtonState,
	checkButtons,
	setEventListeners,
	isValid,
	hideErrorPlace,
	showErrorPlace
};