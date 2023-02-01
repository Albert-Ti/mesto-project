const popup = document.querySelector('.popup');

// ---Функция открытия формы профиля:---
function showPopup(popupItem) {
	if (popupItem.classList.contains('popup_opened')) {
		popupItem.classList.remove('popup_opened');
	} else {
		popupItem.classList.add('popup_opened');
	}
}
document.querySelector('.profile__edit-name-button').addEventListener('click', () => showPopup(popup));
form.querySelector('.form__close').addEventListener('click', () => showPopup(popup));

// ---Функция отправки формы профиля:---
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('[name="username"]');
const jobInput = document.querySelector('[name="about-me"]');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

function formSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = `${nameInput.value}`;
	profileText.textContent = `${jobInput.value}`;
	showPopup(popup);
}
formElement.addEventListener('submit', formSubmitHandler);

// ---Клонируем/Изменяем форму для карточек:---
const popupClone = document.querySelector('.popup__container').cloneNode(true);
popupClone.querySelector('.form__title').textContent = 'Новое место';
popupClone.querySelectorAll('.form__place')[0].setAttribute('placeholder', 'Название');
popupClone.querySelectorAll('.form__place')[1].setAttribute('placeholder', 'Ссылка на картинку');
popupClone.querySelectorAll('.form__place')[0].setAttribute('name', 'cardname');
popupClone.querySelectorAll('.form__place')[1].setAttribute('name', 'url');
popupClone.querySelectorAll('.form__place')[0].removeAttribute('value');
popupClone.querySelectorAll('.form__place')[1].removeAttribute('value');

// ---Создаем новый элемент и вставляем клон-форму карточки:---
const popupCards = document.createElement('div');
popup.after(popupCards);
popupCards.classList.add('popup');
popupCards.append(popupClone);

// ---Функция открытия формы карточек:---
document.querySelector('.profile__button').addEventListener('click', () => showPopup(popupCards));
popupCards.querySelector('.form__close').addEventListener('click', () => showPopup(popupCards));

// ---Функция отправки формы карточек:---
const saveCards = popupCards.querySelector('.form');
function formSubmitCards(evt) {
	evt.preventDefault();
	const titleCard = popupCards.querySelector('[name="cardname"]');
	const imageCard = popupCards.querySelector('[name="url"]');
	addCard(titleCard.value, imageCard.value);
	showPopup(popupCards);
}
saveCards.addEventListener('submit', formSubmitCards);


// ---функция добавления карточки:---
const elements = document.querySelector('.elements');
function addCard(titleValue, urlImg) {

	// ---Клон карточки:---
	const templateCard = document.querySelector('#template-card').content;
	const cloneCard = templateCard.querySelector('.element').cloneNode(true);
	cloneCard.querySelector('.element__image').setAttribute('src', urlImg);
	cloneCard.querySelector('.element__title').textContent = titleValue;

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
// ---Лайк карточек:---
document.querySelectorAll('.element__like').forEach(function (item) {
	item.addEventListener('click', function () {
		let img = item.querySelector('.element__like-img');
		if (img.getAttribute('src') === './image/element-like.svg') {
			img.setAttribute('src', './image/element-like-black.svg');
		} else {
			img.setAttribute('src', './image/element-like.svg');
		}
	})
})
// ---Удаление карточки:---
document.querySelectorAll('.element__remove').forEach(function (item) {
	item.addEventListener('click', function () {
		item.closest('.element').remove();
	})
})
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
	return addCard(item.name, item.link);
})

// ---Открытие/Закрытие картинок---
const popupImg = document.querySelector('.popup_img');
const urlChange = document.querySelector('.modal__open-img');
const modalText = document.querySelector('.modal__text');

document.querySelectorAll('.element__image').forEach((img) => {

	img.addEventListener('click', () => {
		let title = img.closest('.element');
		modalText.textContent = title.querySelector('.element__title').textContent;
		urlChange.setAttribute('src', img.getAttribute('src'));
		showPopup(popupImg);
	});
})
document.querySelector('.modal__close').addEventListener('click', () => showPopup(popupImg));

