export default {
  email(asValue) {
    const regExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regExp.test(asValue);
  },

  password(asValue) {
    const regExp =
      /^.*(?=^.{10,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //  10 ~ 15자 특수문자, 문자, 숫자 조합
    return regExp.test(asValue);
  },

  mobile(asValue) {
    const regExp = /^[0-9]{10,11}$/;
    return regExp.test(asValue);
  },
};
