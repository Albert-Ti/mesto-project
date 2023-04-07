export default class UserInfo {
  constructor({ name, about, avatar, _id, getUserInfo, setUserInfo }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._id = _id;
    this.getUserInfo = getUserInfo;
    this.setUserInfo = setUserInfo;
  };
}