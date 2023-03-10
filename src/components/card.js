import { openPopup } from "./utils.js";
import { deleteMyCard, addLikeCard, removeLike } from "./api.js";

const cardElements = document.querySelector('.elements');
const popupImg = document.querySelector('.popup-img');
const pictureOpen = document.querySelector('.modal__open-img');
const pictureTitle = document.querySelector('.modal__text');
const cardImageUrl = document.querySelector('[name="url"]');
const cardImageName = document.querySelector('[name="cardname"]');


// ---функция добавления карточки:---
const addCard = (card, userId) => {
	const cardElement = createCard(card, userId);
	cardElements.prepend(cardElement);
};

// ---Клонирование/Изменение карточки:---
const createCard = (card, userId) => {
	const templateCard = document.querySelector('#template-card').content;
	const cloneCard = templateCard.querySelector('.element').cloneNode(true);
	const likeButton = cloneCard.querySelector('.element__like');
	const elementImage = cloneCard.querySelector('.element__image');
	const userLikes = cloneCard.querySelector('.element__likes');

	if (card.owner._id === userId) {
		cloneCard.querySelector('.element__remove').style.display = 'block';
	};

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


	card.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = `${card.likes.length}`;

	// ---Лайк добавленных карточек:---
	likeButton.addEventListener('click', () => {
		if (!likeButton.classList.contains('element__like_active')) {
			addLikeCard(card._id)
				.then((check) => {
					check.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = `${check.likes.length}`;
					likeButton.classList.add('element__like_active')
				})
				.catch(err => console.log(`Ошибка: ${err}`))
		} else {
			removeLike(card._id)
				.then((check) => {
					check.likes.length === 0 ? userLikes.textContent = '' : userLikes.textContent = `${check.likes.length}`;
					likeButton.classList.remove('element__like_active')
				})
				.catch(err => console.log(`Ошибка: ${err}`));
		};
	});

	card.likes.forEach(like => {
		if (like._id === userId) {
			likeButton.classList.add('element__like_active');
		} else {
			likeButton.classList.remove('element__like_active');
		}
	});

	// ---Удаление добавленных карточек:---
	cloneCard.querySelector('.element__remove').addEventListener('click', () => {

		deleteMyCard(card._id)
			.then(() => cloneCard.closest('.element').remove())
			.catch(err => console.log(`Ошибка: ${err}`));
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