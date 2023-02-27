import { openPopup } from "./utils.js";

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const inputProfileName = document.querySelector('[name="username"]');
const inputProfileJob = document.querySelector('[name="about-me"]');
const popupCard = document.querySelector('.popup-card');
const popupProfile = document.querySelector('.popup-profile');

document.querySelector('.profile__edit-name-button').addEventListener('click', () => openPopup(popupProfile));
document.querySelector('.profile__button').addEventListener('click', () => openPopup(popupCard));

export {
	profileName,
	profileJob,
	inputProfileName,
	inputProfileJob,
	popupCard,
	popupProfile,
};