const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const popup = page.querySelector('.popup');


// ---Функция открытия формы профиля:---
const editProfile = profile.querySelector('.profile__edit-name-button');
const formClose = form.querySelector('.form__close');
function showPopup(popupItem) {
	if (popupItem.classList.contains('popup_opened')) {
		popupItem.classList.remove('popup_opened');
	} else {
		popupItem.classList.add('popup_opened');
	}
}
editProfile.addEventListener('click', () => { showPopup(popup); });
formClose.addEventListener('click', () => { showPopup(popup); });

// ---Функция отправки формы профиля:---
const formElement = popup.querySelector('.form');
const nameInput = form.querySelector('[name="username"]');
const jobInput = form.querySelector('[name="about-me"]');
const profileName = profile.querySelector('.profile__name');
const profileText = profile.querySelector('.profile__text');
function formSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = `${nameInput.value}`;
	profileText.textContent = `${jobInput.value}`;
	showPopup(popup);
}
formElement.addEventListener('submit', formSubmitHandler);


// ---Клонируем/Изменяем форму для карточек:---
const popupClone = page.querySelector('.popup__container').cloneNode(true);
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
const profileButton = profile.querySelector('.profile__button');
const formCloseCards = popupCards.querySelector('.form__close');
profileButton.addEventListener('click', () => { showPopup(popupCards); });
formCloseCards.addEventListener('click', () => { showPopup(popupCards); });


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

// ---Создание карточки---
const elements = document.querySelector('.elements');
// ---функция добавления карточки:---
function addCard(titleValue, urlImg) {
	// ---Клон карточки:---
	const templateCard = document.querySelector('#template-card').content;
	const cardElement = templateCard.querySelector('.element').cloneNode(true);

	cardElement.querySelector('.element__image').setAttribute('src', urlImg);
	cardElement.querySelector('.element__title').textContent = titleValue;

	// ---Лайк добавленных карточек:---
	const likeButton = cardElement.querySelectorAll('.element__like');
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
	const deleteImg = cardElement.querySelectorAll('.element__remove');
	deleteImg.forEach(function (item) {
		item.addEventListener('click', function () {
			item.closest('.element').remove();
		})
	});
	elements.prepend(cardElement);
}

// ---Лайк карточек:---
let likeButtonTwo = document.querySelectorAll('.element');
likeButtonTwo.forEach(function (item) {
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
const deleteImgTwo = document.querySelectorAll('.element__remove');
deleteImgTwo.forEach(function (item) {
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