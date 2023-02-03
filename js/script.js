const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupImg = document.querySelector('.popup-img');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const closeButtons = document.querySelectorAll('.popup__close');
const inputProfileName = document.querySelector('[name="username"]');
const inputProfileJob = document.querySelector('[name="about-me"]');
const cardsElements = document.querySelector('.elements');
const cardImageUrl = document.querySelector('[name="url"]');
const cardImageName = document.querySelector('[name="cardname"]');
const pictureOpen = document.querySelector('.modal__open-img');
const pictureTitle = document.querySelector('.modal__text');

document.querySelector('.profile__button').addEventListener('click', () => openPopup(popupCard));
document.querySelector('.profile__edit-name-button').addEventListener('click', () => openPopup(popupProfile));

// ---Функции открытия/закрытия попап-контента:---
function openPopup(popup) {
	popup.classList.add('popup_opened');
}
function closePopup(popup) {
	popup.classList.remove('popup_opened');
}
closeButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => {
		closePopup(popup);
	});
})

// ---Функция отправки формы профиля:---
function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = `${inputProfileName.value}`;
	profileJob.textContent = `${inputProfileJob.value}`;
	closePopup(popupProfile);
}
document.forms["profile-form"].addEventListener('submit', handleProfileFormSubmit);

// ---Функция отправки формы карточек:---
function handleCardsFormSubmit(evt) {
	evt.preventDefault();
	addCard(cardImageName.value, cardImageUrl.value);
	closePopup(popupCard);
	evt.target.reset();
}
document.forms["card-form"].addEventListener('submit', handleCardsFormSubmit);

// ---функция добавления карточки:---
function addCard(titleValue, urlValue) {
	const cardElement = createCard(titleValue, urlValue);
	cardsElements.prepend(cardElement);
}

// ---Клон карточки:---
function createCard(title, url) {
	const templateCard = document.querySelector('#template-card').content;
	const cloneCard = templateCard.querySelector('.element').cloneNode(true);
	const elementImage = cloneCard.querySelector('.element__image');
	const likeButton = cloneCard.querySelector('.element__like');
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
	cloneCard.querySelectorAll('.element__remove').forEach(function (item) {
		item.addEventListener('click', () => {
			item.closest('.element').remove();
		})
	});
	return cloneCard;
}

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
