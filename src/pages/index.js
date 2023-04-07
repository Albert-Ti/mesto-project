import './index.css';

import {
  profileName,
  profileJob,
  inputProfileName,
  inputProfileJob,
  avatarImage,
  config
} from '../utils/constants.js'

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const formValidator = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__place',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__place_active-error'
});
formValidator.enableValidation();


let userId;
const api = new Api(config);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([{ name, about, avatar, _id }, cards]) => {

    const userInfo = new UserInfo({
      name,
      about,
      avatar,
      _id,
      getUserInfo: () => {
        profileName.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;
        inputProfileName.value = userInfo.name;
        inputProfileJob.value = userInfo.about;
        avatarImage.src = userInfo.avatar;
        userId = userInfo._id;
      },

      setUserInfo: () => {
        const popupAvatar = new PopupWithForm({
          selector: '.popup-avatar',
          submitForm({ avatar }, evt) {
            evt.preventDefault();

            api.editAvatar(avatar)
              .then(data => {
                avatarImage.src = data.avatar;
              })
              .then(() => popupAvatar.close())
              .then(() => evt.target.reset())
              .catch(err => console.log(`Ошибка: ${err}`))
              .finally(() => document.forms['avatar-form'].button.textContent = 'Сохранить');
          }
        });
        popupAvatar.setEventListeners();


        const popupProfile = new PopupWithForm({
          selector: '.popup-profile',
          submitForm({ username, 'about-me': job }, evt) {
            evt.preventDefault();

            api.editProfile(username, job)
              .then(({ name, about }) => {
                profileName.textContent = name;
                profileJob.textContent = about;
              })
              .then(() => popupProfile.close())
              .then(() => evt.target.reset())
              .catch(err => console.log(`Ошибка: ${err}`))
              .finally(() => document.forms['profile-form'].button.textContent = 'Сохранить');
          }
        });
        popupProfile.setEventListeners();
      }

    })
    userInfo.getUserInfo();
    userInfo.setUserInfo();


    const defaultCards = new Section({
      data: cards,
      renderer: (card) => {
        const cardElem = createCard(card);
        defaultCards.addItem(cardElem);
      }
    }, '.elements');
    defaultCards.renderItems();



    const popupForm = new PopupWithForm({
      selector: '.popup-card',
      submitForm({ cardname, url }, evt) {
        evt.preventDefault();

        api.sendUserCard(cardname, url)
          .then(card => {
            const userCard = createCard(card);
            defaultCards.addItem(userCard);
          })
          .then(() => popupForm.close())
          .then(() => evt.target.reset())
          .catch(err => console.log(`Ошибка: ${err}`))
          .finally(() => document.forms['card-form'].button.textContent = 'Сохранить');
      }
    });
    popupForm.setEventListeners();


    function createCard(item) {
      const card = new Card({
        api,
        item,
        userId,
        handleCardClick() {
          const popupImage = new PopupWithImage(item, '.popup-img');
          popupImage.openImg();
        }
      }, '#template-card')
      const cardElem = card.generateCard();
      return cardElem;
    }


  }).catch(err => console.log(`Ошибка: ${err}`));
