export const popups = document.querySelectorAll('.popup');
// ---Функции открытия/закрытия попап-контента:---
export function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscape);
};

// ---закрытие popup клавищей "Escape"---
export function handleEscape(evt) {
	if (evt.key === 'Escape') {
		popups.forEach(closePopup);
	};
};

export function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscape);
};


export const renderLoading = (isLoad, button, buttonText = 'Сохранить', loadButton = 'Сохранение...') => {
	if (isLoad) {
		button.textContent = loadButton;
	} else {
		button.textContent = buttonText;
	}
};

