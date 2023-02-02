const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
// ---Функция открытия формы профиля:---
function showPopup(popupItem) {
	if (popupItem.classList.contains('popup_opened')) {
		popupItem.classList.remove('popup_opened');
	} else {
		popupItem.classList.add('popup_opened');
	}
}
document.querySelector('.profile__edit-name-button').addEventListener('click', () => showPopup(popupProfile));
popupProfile.querySelector('.popup__close').addEventListener('click', () => showPopup(popupProfile));

// ---Функция отправки формы профиля:---
const nameInput = document.querySelector('[name="username"]');
const jobInput = document.querySelector('[name="about-me"]');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

function formSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = `${nameInput.value}`;
	profileText.textContent = `${jobInput.value}`;
	showPopup(popupProfile);
}
popupProfile.querySelector('.form').addEventListener('submit', formSubmitHandler);

document.querySelector('.profile__button').addEventListener('click', () => showPopup(popupCard));
popupCard.querySelector('.popup__close').addEventListener('click', () => showPopup(popupCard));

// ---Функция отправки формы карточек:---
function formSubmitCards(evt) {
	evt.preventDefault();
	const titleCard = popupCard.querySelector('[name="cardname"]');
	const imageCard = popupCard.querySelector('[name="url"]');
	addCard(titleCard.value, imageCard.value);
	showPopup(popupCard);
}
popupCard.querySelector('.form').addEventListener('submit', formSubmitCards);


// ---функция добавления карточки:---
const elements = document.querySelector('.elements');
function addCard(titleValue, urlImg) {
	// ---Клон карточки:---
	const templateCard = document.querySelector('#template-card').content;
	const cloneCard = templateCard.querySelector('.element').cloneNode(true);
	const elementImage = cloneCard.querySelector('.element__image');
	elementImage.setAttribute('src', urlImg);
	cloneCard.querySelector('.element__title').textContent = titleValue;

	elementImage.addEventListener('click', () => {
		modalText.textContent = titleValue;
		urlChange.setAttribute('src', urlImg);
		showPopup(popupImg);
	})
	// ---Лайк добавленных карточек:---
	const likeButton = cloneCard.querySelectorAll('.element__like');
	for (like of likeButton) {
		like.addEventListener('click', function () {
			let element = this.closest('.element__like');
			let img = element.querySelector('.element__like-img');
			if (img.getAttribute('src') === './image/element-like.svg') {
				img.setAttribute('src', './image/element-like-black.svg');
			} else {
				img.setAttribute('src', './image/element-like.svg');
			}
		})
	};
	// ---Удаление добавленных карточек:---
	cloneCard.querySelectorAll('.element__remove').forEach(function (item) {
		item.addEventListener('click', function () {
			item.closest('.element').remove();
		})
	});
	elements.prepend(cloneCard);
}

const popupImg = document.querySelector('.popup-img');
const urlChange = document.querySelector('.modal__open-img');
const modalText = document.querySelector('.modal__text');
popupImg.querySelector('.popup__close').addEventListener('click', () => showPopup(popupImg));

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];
initialCards.forEach(function (item) {
	addCard(item.name, item.link);
})
