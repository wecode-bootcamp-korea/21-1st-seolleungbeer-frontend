export default {
  email(asValue) {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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
