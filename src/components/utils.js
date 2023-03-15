
// ---Функции открытия/закрытия попап-контента:---
export function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keyup', handleEscape);
};
export function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keyup', handleEscape);
};

// ---закрытие popup клавищей "Escape"---
export function handleEscape(evt) {
	if (evt.key === 'Escape') {
		// const popups = document.querySelectorAll('.popup');
		// popups.forEach(closePopup);
		const activePopup = document.querySelector('.popup_opened');
		closePopup(activePopup);
	};
};

// ---изменение текста кнопки во время загрузки сервера---
export const renderLoading = (isLoad, button, buttonText = 'Сохранить', loadButton = 'Сохранение...') => {
	if (isLoad) {
		button.textContent = loadButton;
	} else {
		button.textContent = buttonText;
	}
};

