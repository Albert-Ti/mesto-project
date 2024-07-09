const YP_LEARN_URL = 'https://nomoreparties.co/v1/plus-cohort-21'
const MY_DB_URL = 'http://api.albert-ti.students.nomoredomainsmonster.ru'

export const config = {
  baseUrl: MY_DB_URL,
  headers: {
    authorization: '1bdbc94b-6239-4b7b-83a9-133ed323b1e4',
    'Content-Type': 'application/json',
  },
}

export const dataSelectors = {
  formSelector: '.form',
  inputSelector: '.form__place',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__place_active-error',
}

export const formData = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__text',
  avatarSelector: '.profile__avatar-img',
}
