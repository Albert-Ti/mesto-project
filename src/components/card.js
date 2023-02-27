import { openPopup } from "./utils.js";

const cardElements = document.querySelector('.elements');
const popupImg = document.querySelector('.popup-img');
const pictureOpen = document.querySelector('.modal__open-img');
const pictureTitle = document.querySelector('.modal__text');
const cardImageUrl = document.querySelector('[name="url"]');
const cardImageName = document.querySelector('[name="cardname"]');

const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
const chelyabinskRegion = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
const kholmogorskyRayon = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');

// ---функция добавления карточки:---
function addCard(titleValue, urlValue) {
	const cardElement = createCard(titleValue, urlValue);
	cardElements.prepend(cardElement);
};

// ---Клонирование/Изменение карточки:---
function createCard(title, url) {
	const templateCard = document.querySelector('#template-card').content;
	const cloneCard = templateCard.querySelector('.element').cloneNode(true);
	const likeButton = cloneCard.querySelector('.element__like');
	// ---Реализация нажатие на картинку---
	const elementImage = cloneCard.querySelector('.element__image');
	cloneCard.querySelector('.element__title').textContent = title;
	elementImage.setAttribute('src', url);
	elementImage.setAttribute('alt', `Картинка ${title}`);
	// ---открытие картинки---
	elementImage.addEventListener('click', () => {
		pictureTitle.textContent = title;
		pictureOpen.setAttribute('src', url);
		pictureOpen.setAttribute('alt', `Картинка ${title}`);
		openPopup(popupImg);
	});
	// ---Лайк добавленных карточек:---
	likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));
	// ---Удаление добавленных карточек:---
	cloneCard.querySelector('.element__remove').addEventListener('click', () => cloneCard.closest('.element').remove());
	return cloneCard;
};

const initialCards = [
	{ name: 'Архыз', link: arkhyz },
	{ name: 'Челябинская область', link: chelyabinskRegion },
	{ name: 'Иваново', link: ivanovo },
	{ name: 'Камчатка', link: kamchatka },
	{ name: 'Холмогорский район', link: kholmogorskyRayon },
	{ name: 'Байкал', link: baikal }
];
initialCards.forEach(function (item) {
	addCard(item.name, item.link);
});

export {
	createCard,
	addCard,
	initialCards,
	cardElements,
	popupImg,
	pictureOpen,
	pictureTitle,
	cardImageName,
	cardImageUrl
};