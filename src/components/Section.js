
export default class Section {
  constructor({ data, renderer }, selector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };


  addItem(element) {
    this._container.prepend(element);
  };


  renderItems() {
    this._data.forEach(item => {
      this._renderer(item);
    })
  };
};