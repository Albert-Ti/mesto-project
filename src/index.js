import './pages/index.css';

import {
	enableValidation
} from "./components/validate.js"

import {
	cardImageName,
	cardImageUrl,
	addCard
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
	popupAvatar,
	avatarImage,
	inputAvatarUrl
} from "./components/modal.js";

import {
	renderLoading,
	editProfile,
	getCardsFromServer,
	getProfileData,
	editAvatar,
	sendMyCard,

} from "./components/api.js";


getProfileData()
	.then(data => {
		profileName.textContent = data.name;
		profileJob.textContent = data.about;
		avatarImage.src = data.avatar;
	})

getCardsFromServer()
	.then(data => data.forEach(addCard))



export const handleSubmit = (request, evt, loadingText = 'Сохранение...') => {
	evt.preventDefault();
	const submitButton = evt.target.querySelector('.form__button');
	const initialText = submitButton.textContent;

	renderLoading(true, submitButton, initialText, loadingText);
	request()
		.then(() => {
			evt.target.reset()
		})
		.catch(err => console.log(`Ошибка: ${err}`))
		.finally(() => renderLoading(false, submitButton, initialText));

};

// ---Функция отправки формы профиля:---
export const handleProfileFormSubmit = (evt) => {
	function makeRequest() {
		return editProfile(inputProfileName.value, inputProfileJob.value)
			.then(data => {
				profileName.textContent = data.name;
				profileJob.textContent = data.about;
			});
	}
	closePopup(popupProfile);
	handleSubmit(makeRequest, evt);
};
document.forms["profile-form"].addEventListener('submit', handleProfileFormSubmit);


// ---Функция отправки формы аватара:---
export const handleAvatarFormSubmit = (evt) => {
	function makeRequest() {
		return editAvatar(inputAvatarUrl.value)
			.then(data => {
				avatarImage.src = data.avatar
			})
	}
	closePopup(popupAvatar);
	handleSubmit(makeRequest, evt);
};
document.forms['avatar-form'].addEventListener('submit', handleAvatarFormSubmit);



// ---Функция отправки формы карточек:---
export const handleCardsFormSubmit = (evt) => {
	function makeRequest() {
		return sendMyCard(cardImageName.value, cardImageUrl.value)
			.then(addCard)
	}
	closePopup(popupCard);
	handleSubmit(makeRequest, evt);
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

