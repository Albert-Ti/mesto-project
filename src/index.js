import './pages/index.css';

import {
	enableValidation
} from "./components/validate.js"

import {
	cardImageName,
	cardImageUrl
} from "./components/card.js";

import {
	closePopup,
	popups
} from "./components/utils.js";

import {
	profileName,
	profileJob,
	inputProfileName,
	inputProfileJob,
	popupCard,
	popupProfile,
	popupAvatar
} from "./components/modal.js";

import {
	sendMyCardToServer,
	changeProfileFromServer,
	renderLoading,
	changeAvatarFromServer
} from "./components/api.js";

// ---Функция отправки формы аватара:---
const handleAvatarFormSubmit = (evt) => {
	evt.preventDefault();
	renderLoading(true);
	document.querySelector('.profile__avatar-img').src = popupAvatar.querySelector('[name="avatar"]').value;
	changeAvatarFromServer(popupAvatar.querySelector('[name="avatar"]').value);
	closePopup(popupAvatar);
	evt.target.reset();
};
document.forms['avatar-form'].addEventListener('submit', handleAvatarFormSubmit);

// ---Функция отправки формы профиля:---
const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();
	renderLoading(true);
	profileName.textContent = `${inputProfileName.value}`;
	profileJob.textContent = `${inputProfileJob.value}`;
	changeProfileFromServer(profileName.textContent, profileJob.textContent);
	closePopup(popupProfile);
};

// ---Функция отправки формы карточек:---
const handleCardsFormSubmit = (evt) => {
	evt.preventDefault();
	renderLoading(true);
	sendMyCardToServer(cardImageName.value, cardImageUrl.value);
	closePopup(popupCard);
	evt.target.reset();
	setTimeout(() => location.reload(), 500);
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
