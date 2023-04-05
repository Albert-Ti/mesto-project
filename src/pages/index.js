import './index.css';

import {
  profileName,
  profileJob,
  inputProfileName,
  inputProfileJob,
  avatarImage,
  submitBtn,
  config
} from '../utils/constants.js'

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { formValidator } from '../components/FormValidator.js';

formValidator.enableValidation();



let userId;
const api = new Api(config);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([{ name, about, avatar, _id }, cards]) => {

    userId = _id;



    const userInfo = new UserInfo({
      name,
      about,
      avatar,
      getUserInfo: () => {
        profileName.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;
        inputProfileName.value = userInfo.name;
        inputProfileJob.value = userInfo.about;
        avatarImage.src = userInfo.avatar
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
      }
    })
    userInfo.getUserInfo();
    userInfo.setUserInfo();



    // avatarImage.src = avatar;
    // profileName.textContent = name;
    // profileJob.textContent = about;
    // inputProfileName.value = name;
    // inputProfileJob.value = about;



    const defaultCards = new Section({
      data: cards,
      renderer: (item) => {
        const card = new Card({
          api,
          item,
          userId,
          handleCardClick() {
            card._element.querySelector('.element__image').addEventListener('click', (evt) => {
              const popupImage = new PopupWithImage(item, '.popup-img');
              popupImage.openImg();
            })
          }
        }, '#template-card');
        const cardElem = card.generateCard();
        defaultCards.addItem(cardElem);
      }
    }, '.elements');
    defaultCards.renderItems();



    const popupForm = new PopupWithForm({
      selector: '.popup-card',
      submitForm({ cardname, url }, evt) {
        evt.preventDefault();

        api.sendUserCard(cardname, url)
          .then(data => {
            const userCard = new Card({
              api,
              item: data,
              userId,
              handleCardClick() {
                userCard._element.querySelector('.element__image').addEventListener('click', (evt) => {
                  const popupImage = new PopupWithImage(item, '.popup-img');
                  popupImage.openImg();
                })
              }
            }, '#template-card')
            const userCardElem = userCard.generateCard();
            defaultCards.addItem(userCardElem);
          })
          .then(() => popupForm.close())
          .then(() => evt.target.reset())
          .catch(err => console.log(`Ошибка: ${err}`))
          .finally(() => document.forms['card-form'].button.textContent = 'Сохранить');
      }
    });
    popupForm.setEventListeners();



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

  }).catch(err => console.log(`Ошибка: ${err}`));
