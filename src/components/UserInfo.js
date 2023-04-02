
export default class UserInfo {
  constructor({ name, about, avatar, getUserInfo, setUserInfo }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this.getUserInfo = getUserInfo;
    this.setUserInfo = setUserInfo;
  };
}