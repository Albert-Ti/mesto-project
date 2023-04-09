export default class UserInfo {
  constructor(formData) {

    this._profileName = formData.profileName;
    this._profileJob = formData.profileJob;
    this._inputProfileName = formData.inputProfileName;
    this._inputProfileJob = formData.inputProfileJob;
    this._avatarImage = formData.avatarImage;
  };


  getUserInfo() {
    return JSON.parse(localStorage.getItem(('profile')))
  };


  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
    this._avatarImage.src = data.avatar;
  };

  generate() {
    this._user = this.getUserInfo();

    this._profileName.textContent = this._user.name;
    this._profileJob.textContent = this._user.about;
    this._avatarImage.src = this._user.avatar;

    this._inputProfileName.value = this._user.name;
    this._inputProfileJob.value = this._user.about;
  }
}