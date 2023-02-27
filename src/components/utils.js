const popups = document.querySelectorAll('.popup');
// ---Функции открытия/закрытия попап-контента:---
function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscape);
};

// ---закрытие popup клавищей "Escape"---
function handleEscape(evt) {
	if (evt.key === 'Escape') {
		popups.forEach(closePopup);
	};
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscape);
};

export { openPopup, closePopup, popups, handleEscape };