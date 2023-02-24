const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupImg = document.querySelector('.popup-img');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const closeButtons = document.querySelectorAll('.popup__close');
const inputProfileName = document.querySelector('[name="username"]');
const inputProfileJob = document.querySelector('[name="about-me"]');
const cardElements = document.querySelector('.elements');
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
	cardElements.prepend(cardElement);
}

// ---Клонирование/Изменение карточки:---
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
	cloneCard.querySelector('.element__remove').addEventListener('click', () => cloneCard.closest('.element').remove());
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
const popup = document.querySelectorAll('.popup');

// реализация закрытие popup клавищей "Escape"
document.addEventListener('keydown', keyClose);
function keyClose(evt) {
	if (evt.key === 'Escape') {
		popup.forEach((popup) => {
			closePopup(popup);
		})
	}
}

// реализация закрытия popup по оверлею
popup.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(popup);
		}
	})
})


// -------------------------------Валидация Формы

function showErrorPlace(formElem, inputElem, errorMessage) {
	const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
	inputElem.classList.add('form__place_active-error');
	errorElem.textContent = errorMessage;
};

function hideErrorPlace(formElem, inputElem) {
	const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
	inputElem.classList.remove('form__place_active-error');
	errorElem.textContent = '';
};


function isValid(formElem, inputElem) {
	if (inputElem.validity.patternMismatch) {
		inputElem.setCustomValidity(inputElem.dataset.errorMessage);
	} else {
		inputElem.setCustomValidity('');
	}
	if (!inputElem.validity.valid) {
		showErrorPlace(formElem, inputElem, inputElem.validationMessage);
	} else {
		hideErrorPlace(formElem, inputElem);
	};
};

function setEventListeners(formElem) {
	const inputList = Array.from(formElem.querySelectorAll('.form__place'));
	const buttonList = formElem.querySelector('.form__button');
	toggleButtonState(inputList, buttonList);
	inputList.forEach((inputElem) => {
		inputElem.addEventListener('input', () => {
			isValid(formElem, inputElem);
			toggleButtonState(inputList, buttonList);
		});
	});
};

function checkButtons(inputList) {
	return inputList.some((elem) => {
		return !elem.validity.valid;
	});
};

function toggleButtonState(inputList, buttonElem) {
	if (checkButtons(inputList)) {
		buttonElem.classList.add('form__button_inactive');
		buttonElem.setAttribute('disabled', true);
	} else {
		buttonElem.classList.remove('form__button_inactive');
		buttonElem.removeAttribute('disabled');
	};
};

function enableValidation() {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElem) => {
		setEventListeners(formElem);
	});
};
enableValidation();