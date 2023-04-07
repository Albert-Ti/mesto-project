export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__text');
export const inputProfileName = document.querySelector('[name="username"]');
export const inputProfileJob = document.querySelector('[name="about-me"]');
export const popupProfile = document.querySelector('.popup-profile');
export const popupAvatar = document.querySelector('.popup-avatar');
export const avatarImage = document.querySelector('.profile__avatar-img');
export const inputAvatarUrl = document.querySelector('[name="avatar"]');
export const popups = document.querySelectorAll('.popup');
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '1bdbc94b-6239-4b7b-83a9-133ed323b1e4',
    'Content-Type': 'application/json'
  },
};