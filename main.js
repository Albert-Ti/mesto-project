(()=>{"use strict";var t={nameSelector:".profile__name",aboutSelector:".profile__text",avatarSelector:".profile__avatar-img"};function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,o(n.key),n)}}function n(t,e,r){return(e=o(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t){var r=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(r)?r:String(r)}var i=function(){function t(e){var r=this,o=e.baseUrl,i=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n(this,"getCards",(function(){return r._request("".concat(r._baseUrl,"/cards"),{headers:r._headers})})),n(this,"getUserInfo",(function(){return r._request("".concat(r._baseUrl,"/users/me"),{headers:r._headers})})),this._baseUrl=o,this._headers=i}var e,o;return e=t,(o=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"_request",value:function(t,e){return fetch(t,e).then(this._checkResponse)}},{key:"editProfile",value:function(t,e){return this._request("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:e})})}},{key:"editAvatar",value:function(t){return this._request("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})})}},{key:"sendUserCard",value:function(t,e){return this._request("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:e})})}},{key:"deleteUserCard",value:function(t){return this._request("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:this._headers})}},{key:"removeLike",value:function(t){return this._request("".concat(this._baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:this._headers})}},{key:"addLike",value:function(t){return this._request("".concat(this._baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:this._headers})}}])&&r(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==a(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===a(o)?o:String(o)),n)}var o}var c=function(){function t(e,r){var n=e.data,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._data=n,this._renderer=o,this._container=document.querySelector(r)}var e,r;return e=t,(r=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(){var t=this;this._data.forEach((function(e){t._renderer(e)}))}}])&&u(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===s(o)?o:String(o)),n)}var o}var f=function(){function t(e,r){var n=e.api,o=e.item,i=e.userData,a=e.handleCardClick;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._api=n,this._card=o,this._userId=i._id,this._handleCardClick=a,this._selector=r,this._element=this._getElement(),this._removeBtn=this._element.querySelector(".element__remove")}var e,r;return e=t,(r=[{key:"_getElement",value:function(){return document.querySelector(this._selector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){var t=this;return this._setEventListeners(),this._imageCard=this._element.querySelector(".element__image"),this._imageCard.addEventListener("click",(function(){return t._handleCardClick()})),this._imageCard.src=this._card.link,this._imageCard.alt="Картинка ".concat(this._card.name),this._element.querySelector(".element__title").textContent=this._card.name,this._card.owner._id!==this._userId&&(this._removeBtn.style.display="none"),this._element}},{key:"_setEventListeners",value:function(){var t=this;this._likeButton=this._element.querySelector(".element__like"),this._userLikes=this._element.querySelector(".element__likes"),this._removeBtn.addEventListener("click",(function(){t._api.deleteUserCard(t._card._id).then((function(){return t._element.closest(".element").remove()})).catch((function(t){return console.log("Ошибка: ".concat(t))}))})),this._likeButton.addEventListener("click",(function(){t._likeButton.classList.contains("element__like_active")?t._api.removeLike(t._card._id).then((function(e){0===e.likes.length?t._userLikes.textContent="":t._userLikes.textContent="".concat(e.likes.length),t._likeButton.classList.remove("element__like_active")})).catch((function(t){return console.log("Ошибка: ".concat(t))})):t._api.addLike(t._card._id).then((function(e){0===e.likes.length?t._userLikes.textContent="":t._userLikes.textContent="".concat(e.likes.length),t._likeButton.classList.add("element__like_active")})).catch((function(t){return console.log("Ошибка: ".concat(t))}))})),0===this._card.likes.length?this._userLikes.textContent="":this._userLikes.textContent=this._card.likes.length,this._card.likes.forEach((function(e){e._id===t._userId?t._likeButton.classList.add("element__like_active"):t._likeButton.classList.remove("element__like_active")}))}}])&&l(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===p(o)?o:String(o)),n)}var o}var m=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,r;return e=t,(r=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_opened")&&t.close(),e.target.classList.contains("popup__close")&&t.close()}))}}])&&y(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function d(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==h(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==h(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===h(o)?o:String(o)),n)}var o}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},v.apply(this,arguments)}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=_(n);if(o){var r=_(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._popupImg=document.querySelector(".modal__open-img"),e._popupImgText=document.querySelector(".modal__text"),e}return e=a,(r=[{key:"open",value:function(t){v(_(a.prototype),"open",this).call(this),this._popupImg.src=t.link,this._popupImg.alt="Картинка ".concat(t.name),this._popupImgText.textContent=t.name}}])&&d(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(m);function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==S(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==S(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===S(o)?o:String(o)),n)}var o}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=C(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},w.apply(this,arguments)}function E(t,e){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},E(t,e)}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&E(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=C(n);if(o){var r=C(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===S(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t){var e,r=t.selector,n=t.submitForm;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,r)).submitForm=n,e._form=e._popup.querySelector(".form"),e._inputList=e._popup.querySelectorAll(".form__place"),e._submitButton=e._popup.querySelector(".form__button"),e._submitButtonText=e._submitButton.textContent,e}return e=a,r=[{key:"renderLoading",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";this._submitButton.textContent=t?e:this._submitButtonText}},{key:"_getInputValues",value:function(){var t=this;return this._obj={},this._inputList.forEach((function(e){t._obj[e.name]=e.value})),this._obj}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"setEventListeners",value:function(){var t=this;w(C(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(e){e.preventDefault(),t.submitForm(t._getInputValues()),t.renderLoading(!0)}))}},{key:"close",value:function(){w(C(a.prototype),"close",this).call(this),this._form.reset()}}],r&&k(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(m);function L(t){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(t)}function P(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==L(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==L(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===L(o)?o:String(o)),n)}var o}var O=function(){function t(e){var r=e.nameSelector,n=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=document.querySelector(r),this._about=document.querySelector(n),this._avatar=document.querySelector(o)}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent}}},{key:"setUserInfo",value:function(t){this._name.textContent=t.name,this._about.textContent=t.about,this._avatar.src=t.avatar}},{key:"generate",value:function(){this._user=this.getUserInfo(),this._name.textContent=this._user.name,this._about.textContent=this._user.about}}])&&P(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function B(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==q(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===q(o)?o:String(o)),n)}var o}var T=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formSelector=e,this._inputSelector=r.inputSelector,this._submitButtonSelector=r.submitButtonSelector,this._inactiveButtonClass=r.inactiveButtonClass,this._errorClass=r.errorClass,this._inputList=Array.from(this._formSelector.querySelectorAll(this._inputSelector)),this._buttonList=this._formSelector.querySelector(this._submitButtonSelector)}var e,r;return e=t,(r=[{key:"_showErrorPlace",value:function(t,e){this._errorElem=this._formSelector.querySelector(".".concat(t.id,"-error")),t.classList.add(this._errorClass),this._errorElem.textContent=e}},{key:"_hideErrorPlace",value:function(t){this._errorElem=this._formSelector.querySelector(".".concat(t.id,"-error")),t.classList.remove(this._errorClass),this._errorElem.textContent=""}},{key:"_isValid",value:function(t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?this._hideErrorPlace(t):this._showErrorPlace(t,t.validationMessage)}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._isValid(e),t._toggleButtonState()}))})),this._formSelector.addEventListener("reset",(function(){setTimeout((function(){t._toggleButtonState()}),0)}))}},{key:"_checkButtons",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._hideErrorPlace(e)}))}},{key:"_toggleButtonState",value:function(){this._checkButtons()?(this._buttonList.classList.add(this._inactiveButtonClass),this._buttonList.setAttribute("disabled",!0)):(this._buttonList.classList.remove(this._inactiveButtonClass),this._buttonList.removeAttribute("disabled"))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&B(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var I,U={};I={formSelector:".form",inputSelector:".form__place",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_inactive",errorClass:"form__place_active-error"},Array.from(document.querySelectorAll(I.formSelector)).forEach((function(t){var e=new T(t,I),r=t.getAttribute("name");U[r]=e,e.enableValidation()}));var R=new i({baseUrl:"http://api.albert-ti.students.nomoredomainsmonster.ru",headers:{authorization:"1bdbc94b-6239-4b7b-83a9-133ed323b1e4","Content-Type":"application/json"}});Promise.all([R.getUserInfo(),R.getCards()]).then((function(e){var r,n,o=(n=2,function(t){if(Array.isArray(t))return t}(r=e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,u=[],c=!0,s=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(t){s=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(r,n)||function(t,e){if(t){if("string"==typeof t)return x(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?x(t,e):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],a=o[1],u=new O(t);u.setUserInfo(i),u.generate();var s=new c({data:a,renderer:function(t){var e=h(t);s.addItem(e)}},".elements");s.renderItems();var l=new j({selector:".popup-avatar",submitForm:function(t){var e=t.avatar;R.editAvatar(e).then((function(t){u.setUserInfo(t),l.close()})).catch((function(t){return console.log("Ошибка: ".concat(t))})).finally((function(){return l.renderLoading(!1)}))}});l.setEventListeners(),document.querySelector(".profile__avatar").addEventListener("click",(function(){l.open(),U["avatar-form"].resetValidation()}));var p=new j({selector:".popup-profile",submitForm:function(t){var e=t.name,r=t.about;R.editProfile(e,r).then((function(t){u.setUserInfo(t),p.close()})).catch((function(t){return console.log("Ошибка: ".concat(t))})).finally((function(){return p.renderLoading(!1)}))}});p.setEventListeners(),document.querySelector(".profile__edit-name-button").addEventListener("click",(function(){p.open(),p.setInputValues(u.getUserInfo()),U["profile-form"].resetValidation()}));var y=new j({selector:".popup-card",submitForm:function(t){var e=t.cardname,r=t.url;R.sendUserCard(e,r).then((function(t){var e=h(t);s.addItem(e),y.close()})).catch((function(t){return console.log("Ошибка: ".concat(t))})).finally((function(){return y.renderLoading(!1)}))}});y.setEventListeners(),document.querySelector(".profile__button").addEventListener("click",(function(){y.open(),U["card-form"].resetValidation()}));var m=new g(".popup-img");function h(t){return new f({api:R,item:t,userData:i,handleCardClick:function(){m.open(t)}},"#template-card").generateCard()}m.setEventListeners()})).catch((function(t){return console.log("Ошибка: ".concat(t))}))})();