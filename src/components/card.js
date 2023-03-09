import { openPopup } from "./utils.js";
import { deleteMyCard, addLikeCard, removeLike } from "./api.js";

const cardElements = document.querySelector('.elements');
const popupImg = document.querySelector('.popup-img');
const pictureOpen = document.querySelector('.modal__open-img');
const pictureTitle = document.querySelector('.modal__text');
const cardImageUrl = document.querySelector('[name="url"]');
const cardImageName = document.querySelector('[name="cardname"]');


// ---функция добавления карточки:---
const addCard = (card) => {
	if (card.owner._id === '209313a7808b04f182624032') {
		const myCardElement = createCard(card);
		myCardElement.querySelector('.element__remove').style.display = 'block';
		cardElements.append(myCardElement);
	} else {
		const cardElement = createCard(card);
		cardElements.append(cardElement);
	}
};

// ---Клонирование/Изменение карточки:---
const createCard = (card) => {
	const templateCard = document.querySelector('#template-card').content;
	const cloneCard = templateCard.querySelector('.element').cloneNode(true);
	const likeButton = cloneCard.querySelector('.element__like');
	const elementImage = cloneCard.querySelector('.element__image');
	const userLikes = cloneCard.querySelector('.element__likes');


	// ---Реализация нажатие на картинку---
	cloneCard.querySelector('.element__title').textContent = card.name;
	elementImage.setAttribute('src', card.link);
	elementImage.setAttribute('alt', `Картинка ${card.name}`);

	// ---открытие картинки---
	elementImage.addEventListener('click', () => {
		pictureTitle.textContent = card.name;
		pictureOpen.setAttribute('src', card.link);
		pictureOpen.setAttribute('alt', `Картинка ${card.name}`);
		openPopup(popupImg);
	});


	// ---Лайк добавленных карточек:---
	likeButton.addEventListener('click', () => {
		if (!likeButton.classList.contains('element__like_active')) {
			likeButton.classList.add('element__like_active');
			userLikes.textContent++;
			addLikeCard(card._id);
		} else {
			likeButton.classList.remove('element__like_active');
			removeLike(card._id);
			userLikes.textContent--;
		}
	});

	card.likes.forEach(like => {
		if (like._id === '209313a7808b04f182624032') {
			likeButton.classList.add('element__like_active');
		} else {
			likeButton.classList.remove('element__like_active');
		}
	})

	card.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = `${card.likes.length}`;



	// ---Удаление добавленных карточек:---
	cloneCard.querySelector('.element__remove').addEventListener('click', () => {
		cloneCard.closest('.element').remove();
		deleteMyCard(card._id);
	});

	return cloneCard;
};


export {
	createCard,
	addCard,
	cardElements,
	popupImg,
	pictureOpen,
	pictureTitle,
	cardImageName,
	cardImageUrl
};