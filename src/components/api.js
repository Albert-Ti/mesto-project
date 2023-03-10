export const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
	headers: {
		authorization: '1bdbc94b-6239-4b7b-83a9-133ed323b1e4',
		'Content-Type': 'application/json'
	},
};


export const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};


export const request = (url, options) => {
	return fetch(url, options).then(checkResponse);
};


export const editAvatar = (url) => {
	return request(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: url
		})
	})
};


export const editProfile = (name, job) => {
	return request(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: job
		})
	})
};


export const removeLike = (cardId) => {
	return request(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
};


export const addLikeCard = (cardId) => {
	return request(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	})
};


export const deleteMyCard = (cardId) => {
	return request(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
};


export const sendMyCard = (nameCard, linkCard) => {
	return request(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: nameCard,
			link: linkCard
		})
	})
};

export const getUserInfo = () => request(`${config.baseUrl}/users/me`, { headers: config.headers });
export const getCards = () => request(`${config.baseUrl}/cards`, { headers: config.headers });
