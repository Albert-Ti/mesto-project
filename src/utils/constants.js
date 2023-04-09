const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const inputProfileName = document.querySelector('[name="name"]');
const inputProfileJob = document.querySelector('[name="about"]');
const avatarImage = document.querySelector('.profile__avatar-img');

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '1bdbc94b-6239-4b7b-83a9-133ed323b1e4',
    'Content-Type': 'application/json'
  },
};


export const dataSelectors = {
  formSelector: '.form',
  inputSelector: '.form__place',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__place_active-error'
}

export const formData = {
  profileName,
  profileJob,
  inputProfileName,
  inputProfileJob,
  avatarImage,
}