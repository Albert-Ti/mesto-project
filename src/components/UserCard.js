
import Card from "./Card.js";

export default class UserCard extends Card {
  constructor({ api, item, userId }, selector) {
    super(api, item, userId, selector);
    this._api = api;
    this._data = item;
    this._userId = userId;
    this._selector = selector;
  };

  _getElement() {
    super._getElement();
  }

  generateUserCard() {
    super.generateCard();
  };
};
