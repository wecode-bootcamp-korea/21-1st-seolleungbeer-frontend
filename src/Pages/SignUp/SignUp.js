import React from 'react';
import './SignUp.scss';

class SignUp extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="signUp">
        <div className="title">
          <h3>JOIN</h3>
          <span>안녕하세요 선릉맥주입니다.</span>
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
            <input placeholder="이메일" />
            <button>중복확인</button>
          </div>
          <div className="password">
            <input placeholder="비밀번호: 8~15 자 문자, 숫자, 특수문자 조합" />
            <input placeholder="비밀번호 확인" />
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
            <p>연락처</p>
            <input placeholder="연락처: 숫자만 입력하세요" />
          </div>
          <button>가입하기</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
