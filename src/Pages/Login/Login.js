import React from 'react';
import './Login.scss';

class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="login">
        <h2>LOGIN</h2>
        <form>
          <input placeholder="이메일" />
          <input placeholder="비밀번호" />
          <button>로그인</button>
          <button>회원가입</button>
        </form>
      </div>
    );
  }
}

export default Login;
