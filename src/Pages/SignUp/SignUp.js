import React from 'react';
import './SignUp.scss';

// const validateEmail = asValue => {
//   const regExp =
//     /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//   return regExp.test(asValue);
// };

// const validatePassword = asValue => {
//   const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //  8 ~ 15자 특수문자, 문자, 숫자 조합
//   return regExp.test(asValue);
// };

// const validateMobile = asValue => {
//   const regExp = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
//   return regExp.test(asValue);
// };

class SignUp extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="signUp">
        <div className="title">
          <h3>JOIN</h3>
          <p>안녕하세요 선릉맥주입니다.</p>
        </div>
        <div className="profile-image">
          <img src="/images/profile.jpeg" />
          <div className="upload-image">
            <i className="fas fa-camera-retro fa-2x"></i>
            <input />
          </div>
        </div>
        <form>
          <div className="email">
            <div>
              <input placeholder="이메일" />
              <button>중복확인</button>
            </div>
            <span>이메일이 올바르지 않습니다.</span>
          </div>
          <div className="password">
            <input placeholder="비밀번호: 8~15 자 문자, 숫자, 특수문자 조합" />
            <span>이메일이 올바르지 않습니다.</span>
            <input placeholder="비밀번호 확인" />
            <span>이메일이 올바르지 않습니다.</span>
          </div>
          <div className="name">
            <p>이름</p>
            <input placeholder="이름을 입력하세요" />
          </div>
          <div className="sex">
            <p>성별</p>
            <div>
              <input type="radio" id="man" />
              <label htmlFor="man">남자</label>
            </div>
            <div>
              <input type="radio" id="woman" />
              <label htmlFor="woman">여자</label>
            </div>
          </div>
          <div className="mobile">
            <div>
              <p>연락처</p>
              <input placeholder="핸드폰 번호: 숫자만 입력하세요" />
            </div>
            <span>핸드폰번호가 올바르지 않습니다.</span>
          </div>
          <button>가입하기</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
