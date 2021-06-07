import React from 'react';
import { withRouter } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/utils';
import './Login.scss';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  goToMainPage = () => {
    console.log('goToMainPage');
    // this.props.history.push('/main');
  };

  goToSignUpPage = () => {
    console.log('goToSignUpPage');
    // this.props.history.push('/signup');
  };

  handleSubmitForm = e => {
    e.preventDefault();
    console.log('submitForm');
    const { email, password } = this.state;
    if (!validateEmail(email) || !validatePassword(password)) return;

    this.goToMainPage();
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClickSignUpButton = () => {
    this.setState({
      email: '',
      password: '',
    });
    this.goToSignUpPage();
  };

  // async requestLogin() {
  //   try {
  //     const res = await fetch('#', {
  //       method: '',
  //       body: JSON.stringify({
  //         email: '',
  //         password: '',
  //       }),
  //     });

  //     const login = await res.json();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <h2>LOGIN</h2>
        <form onSubmit={this.handleSubmitForm}>
          <input
            type="text"
            placeholder="이메일"
            onChange={this.handleChangeInput}
            value={email}
            name="email"
          />
          {validateEmail(email) || email.length === 0 ? null : (
            <span>이메일이 올바르지 않습니다.</span>
          )}
          <input
            type="password"
            placeholder="비밀번호"
            onChange={this.handleChangeInput}
            value={this.state.password}
            name="password"
          />
          {validatePassword(password) || password.length === 0 ? null : (
            <span>비밀번호가 올바르지 않습니다.</span>
          )}
          <button className="login-button">로그인</button>
        </form>
        <button
          className="signUp-button"
          onClick={this.handleClickSignUpButton}
        >
          회원가입
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
