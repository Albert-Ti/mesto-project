import './pages/index.css';

import {
	enableValidation
} from "./components/validate.js"

import {
	cardImageName,
	cardImageUrl,
	addCard,
} from "./components/card.js";

import {
	closePopup,
	renderLoading
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
	inputAvatarUrl,
	popups
} from "./components/modal.js";

import {
	editProfile,
	getCards,
	getUserInfo,
	editAvatar,
	sendMyCard,

} from "./components/api.js";

let userId;

Promise.all([getUserInfo(), getCards()])
	.then(([userData, cards]) => {
		profileName.textContent = userData.name;
		profileJob.textContent = userData.about;
		inputProfileName.value = userData.name;
		inputProfileJob.value = userData.about;
		avatarImage.src = userData.avatar;
		userId = userData._id;
		cards.forEach(card => addCard(card, userId));
	})
	.catch(err => console.log(`Ошибка: ${err}`));


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
			})
			.then(() => closePopup(popupProfile));
	};
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
			.then(() => closePopup(popupAvatar));
	}
	closePopup(popupAvatar);
	handleSubmit(makeRequest, evt);
};
document.forms['avatar-form'].addEventListener('submit', handleAvatarFormSubmit);



// ---Функция отправки формы карточек:---
export const handleCardsFormSubmit = (evt) => {
	function makeRequest() {
		return sendMyCard(cardImageName.value, cardImageUrl.value)
			.then(card => addCard(card, userId))
			.then(() => closePopup(popupCard));
	};
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

