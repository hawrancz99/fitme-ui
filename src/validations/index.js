export const validatePassword = (password) =>
  new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  ).test(password);

export const validateEmail = (email) =>
  new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  ).test(email);

export const validateFacebook = (facebook) =>
  new RegExp(
    "^(?:https?:\\/\\/)?(?:www\\.)?(\\.facebook|facebook|fb)\\.(com)\\/(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)$"
  ).test(facebook);

export const validateInstagram = (instagram) =>
  new RegExp(
    "^(?:https?:\\/\\/)?(?:www\\.)?(\\.instagram|instagram)\\.(com)\\/(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)$"
  ).test(instagram);
