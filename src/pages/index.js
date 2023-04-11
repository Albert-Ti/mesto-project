import './index.css';
import {
  formData,
  config,
  dataSelectors
} from '../utils/constants.js'
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';



const formValidator = {};
const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElem) => {

    const validator = new FormValidator(formElem, data);
    const forName = formElem.getAttribute('name');

    formValidator[forName] = validator;
    validator.enableValidation();
  })
}
enableValidation(dataSelectors);



const api = new Api(config);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    // localStorage.setItem('profile', JSON.stringify(userData))

    const userInfo = new UserInfo(formData)
    userInfo.setUserInfo(userData);
    userInfo.generate();



    const defaultCards = new Section({
      data: cards,
      renderer: (card) => {
        const cardElem = createCard(card);
        defaultCards.addItem(cardElem);
      }
    }, '.elements');
    defaultCards.renderItems();


    const popupAvatar = new PopupWithForm({
      selector: '.popup-avatar',
      submitForm({ avatar }) {

        api.editAvatar(avatar)
          .then(data => {
            userInfo.setUserInfo(data);
            popupAvatar.close();
          })
          .catch(err => console.log(`Ошибка: ${err}`))
          .finally(() => popupAvatar.renderLoading(false));
      }
    });
    popupAvatar.setEventListeners();

    document.querySelector('.profile__avatar').addEventListener('click', () => {
      popupAvatar.open();
      formValidator['avatar-form'].resetValidation();
    });



    const popupProfile = new PopupWithForm({
      selector: '.popup-profile',
      submitForm({ name, about }) {

        api.editProfile(name, about)
          .then((data) => {
            userInfo.setUserInfo(data);
            popupProfile.close();
          })
          .catch(err => console.log(`Ошибка: ${err}`))
          .finally(() => popupProfile.renderLoading(false));
      }
    });
    popupProfile.setEventListeners();

    document.querySelector('.profile__edit-name-button').addEventListener('click', () => {
      popupProfile.open();
      popupProfile.setInputValues(userInfo.getUserInfo());
      formValidator['profile-form'].resetValidation();
    });



    const popupCard = new PopupWithForm({
      selector: '.popup-card',
      submitForm({ cardname, url }) {

        api.sendUserCard(cardname, url)
          .then(card => {
            const userCard = createCard(card);
            defaultCards.addItem(userCard);

            popupCard.close();
          })
          .catch(err => console.log(`Ошибка: ${err}`))
          .finally(() => popupCard.renderLoading(false));
      }
    });
    popupCard.setEventListeners();

    document.querySelector('.profile__button').addEventListener('click', () => {
      popupCard.open();
      formValidator['card-form'].resetValidation();
    });

    const popupImage = new PopupWithImage('.popup-img');
    popupImage.setEventListeners();


    function createCard(item) {
      const userCard = new Card({
        api,
        item,
        userData,
        handleCardClick() {
          popupImage.open(item);
        }
      }, '#template-card')

      const cardElem = userCard.generateCard();
      return cardElem;
    };

  }).catch(err => console.log(`Ошибка: ${err}`));


