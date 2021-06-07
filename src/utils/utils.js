const validateEmail = asValue => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue);
};

const validatePassword = asValue => {
  const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //  8 ~ 15자 특수문자, 문자, 숫자 조합
  return regExp.test(asValue);
};

const validateMobile = asValue => {
  const regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  return regExp.test(asValue);
};

export { validateEmail, validatePassword };
