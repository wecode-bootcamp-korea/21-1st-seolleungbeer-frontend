import React from 'react';
import validator from '../../utils/validator';
import API from '../../config';
import './Login.scss';
import LoginAnimation from './LoginAnimation/LoginAnimation';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loginWidth: 0,
      loginHeight: 0,
      isAnimated: false,
    };
  }

  handleKeyPressInput = () => {
    this.setState({
      isAnimated: !this.state.isAnimated,
    });
    console.log('keyPress');
  };

  goToMainPage = () => {
    this.props.history.push('/main');
  };

  goToSignUpPage = () => {
    this.props.history.push('/signup');
  };

  handleSubmitForm = e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!validator.email(email) || !validator.password(password)) return;

    this.requestLogin();
    // this.goToMainPage();
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isAnimated: !this.state.isAnimated,
    });
  };

  handleClickSignUpButton = () => {
    this.goToSignUpPage();
  };

  async requestLogin() {
    const { email, password } = this.state;
    try {
      const res = await fetch(`${API}/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { email, isAnimated } = this.state;
    console.log(isAnimated);
    // console.log(this.state.loginWidth, this.state.loginHeight);
    return (
      <>
        <LoginAnimation isAnimated={isAnimated} />
        <div className="login">
          <div className="glass"></div>
          <h2>LOGIN</h2>
          <form onSubmit={this.handleSubmitForm}>
            <input
              type="text"
              placeholder="이메일"
              onChange={this.handleChangeInput}
              onKeyPress={this.handleKeyPressInput}
              value={email}
              name="email"
            />
            {/* {!validator.email(email) && email.length !== 0 && (
              <span>이메일이 올바르지 않습니다.</span>
            )} */}
            <input
              type="password"
              placeholder="비밀번호"
              onChange={this.handleChangeInput}
              onKeyPress={this.handleKeyPressInput}
              value={this.state.password}
              name="password"
            />
            {/* {!validator.password(password) && password.length !== 0 && (
              <span>비밀번호가 올바르지 않습니다.</span>
            )} */}
            <button className="login-button">로그인</button>
          </form>
          <button
            className="signUp-button"
            onClick={this.handleClickSignUpButton}
          >
            회원가입
          </button>
        </div>
      </>
    );
  }
}

export default Login;
