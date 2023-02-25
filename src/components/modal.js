import { openPopup, closePopup } from "./utils.js";

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const inputProfileName = document.querySelector('[name="username"]');
const inputProfileJob = document.querySelector('[name="about-me"]');
const popup = document.querySelectorAll('.popup');
const popupCard = document.querySelector('.popup-card');
const popupProfile = document.querySelector('.popup-profile');
const closeButtons = document.querySelectorAll('.popup__close');

// ---Функция отправки формы профиля:---
function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = `${inputProfileName.value}`;
	profileJob.textContent = `${inputProfileJob.value}`;
	closePopup(popupProfile);
};
document.forms["profile-form"].addEventListener('submit', handleProfileFormSubmit);

document.querySelector('.profile__edit-name-button').addEventListener('click', () => openPopup(popupProfile));
document.querySelector('.profile__button').addEventListener('click', () => openPopup(popupCard));

// ---Закрытие popup на нажатие на "кнопку-крестик"---
closeButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => {
		closePopup(popup);
	});
});

// ---реализация закрытие popup клавищей "Escape"---
document.addEventListener('keydown', keyClose);
function keyClose(evt) {
	if (evt.key === 'Escape') {
		popup.forEach((popup) => {
			closePopup(popup);
		});
	};
};

// ---реализация закрытия popup по оверлей---
popup.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(popup);
		};
	});
});

export {
	handleProfileFormSubmit,
	profileName,
	profileJob,
	inputProfileName,
	inputProfileJob,
	popup,
	popupCard,
	popupProfile,
	closeButtons
};