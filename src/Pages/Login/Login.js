import React from 'react';
import API from '../../config';
import LoginAnimation from './LoginAnimation/LoginAnimation';
import { setToken } from '../../utils/token';
import './Login.scss';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isAnimated: false,
      isCorrected: true,
    };
  }

  handleKeyPressInput = () => {
    this.setState({
      isAnimated: !this.state.isAnimated,
    });
  };

  goToMainPage = () => {
    this.props.history.push('/main');
  };

  goToSignUpPage = () => {
    this.props.history.push('/signup');
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.requestLogin();
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
      const res = await fetch(`${API.login}/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (result.token) {
        setToken(result.token);
        this.goToMainPage();
      } else {
        this.setState({
          isCorrected: false,
        });
      }
    } catch (err) {
      console.error(err);
      this.setState({
        isCorrected: false,
      });
    }
  }

  render() {
    const { email, password, isAnimated, isCorrected } = this.state;

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
              value={email}
              name="email"
            />
            <input
              type="password"
              placeholder="비밀번호"
              onChange={this.handleChangeInput}
              value={password}
              name="password"
            />
            {!isCorrected && <span>이메일과 비밀번호를 확인해주세요.</span>}
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
