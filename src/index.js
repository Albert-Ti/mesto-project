import './pages/index.css';

// ---Функция отправки формы профиля:---
function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = `${inputProfileName.value}`;
	profileJob.textContent = `${inputProfileJob.value}`;
	closePopup(popupProfile);
};

// ---Функция отправки формы карточек:---
function handleCardsFormSubmit(evt) {
	evt.preventDefault();
	addCard(cardImageName.value, cardImageUrl.value);
	closePopup(popupCard);
	evt.target.reset();
};
document.forms["card-form"].addEventListener('submit', handleCardsFormSubmit);


// ---закрытие popup по оверлей и крестику---
popups.forEach((popup) => {
	popup.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(popup);
		};
		if (evt.target.classList.contains('popup__close')) {
			closePopup(popup);
		};
	});
});
document.forms["profile-form"].addEventListener('submit', handleProfileFormSubmit);

import {
	enableValidation,
	toggleButtonState,
	checkButtons,
	setEventListeners,
	isValid,
	hideErrorPlace,
	showErrorPlace
} from "./components/validate.js";

import {
	createCard,
	addCard,
	initialCards,
	cardElements,
	popupImg,
	pictureOpen,
	pictureTitle,
	cardImageName,
	cardImageUrl
} from "./components/card.js";

import {
	openPopup,
	closePopup,
	popups,
	handleEscape
} from "./components/utils.js";

import {
	profileName,
	profileJob,
	inputProfileName,
	inputProfileJob,
	popupCard,
	popupProfile,
} from "./components/modal.js";

