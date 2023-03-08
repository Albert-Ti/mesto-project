import { addCard } from "./card.js";
import { profileName, profileJob } from "./modal.js";


const headers = {
	authorization: '1bdbc94b-6239-4b7b-83a9-133ed323b1e4',
	'Content-Type': 'application/json'
};

const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};

const renderLoading = (isLoad) => {
	if (isLoad) {
		document.querySelectorAll('.form__button').forEach(button => {
			return button.textContent = 'Сохранение...';
		})
	}
};

const changeAvatarFromServer = (url) => {
	fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me/avatar', {
		method: 'PATCH',
		headers,
		body: JSON.stringify({
			avatar: url
		})
	})
		.then(handleResponse)
		.catch(err => console.error(err))
		.finally(() => renderLoading(false));

}

const changeProfileFromServer = (name, job) => {
	return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
		method: 'PATCH',
		headers,
		body: JSON.stringify({
			name: name,
			about: job
		})
	})
		.then(handleResponse)
		.then(data => {
			profileName.textContent = name;
			profileJob.textContent = job;
			return data;
		})
		.catch(err => console.error(err))
		.finally(() => renderLoading(false));

}

const removeLike = (cardId) => {
	return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers
	})
}

const addLikeCard = (cardId) => {
	return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
		method: 'PUT',
		headers
	})
};

const deleteMyCard = (cardId) => {
	return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${cardId}`, {
		method: 'DELETE',
		headers
	})
};

const sendMyCardToServer = (nameCard, linkCard) => {
	fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
		method: 'POST',
		headers,
		body: JSON.stringify({
			name: nameCard,
			link: linkCard
		})
	})
		.then(handleResponse)
		.then(addCard)
		.catch(err => console.error(err))
		.finally(() => renderLoading(false));
};

const getCardsFromServer = () => fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', { headers });
getCardsFromServer()
	.then(handleResponse)
	.then(data => data.forEach(addCard))
	.catch(err => console.error(err));



export {
	deleteMyCard,
	getCardsFromServer,
	changeProfileFromServer,
	sendMyCardToServer,
	addLikeCard,
	removeLike,
	renderLoading,
	changeAvatarFromServer
};
