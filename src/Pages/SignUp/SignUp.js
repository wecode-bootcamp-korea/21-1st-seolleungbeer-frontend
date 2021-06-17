import React from 'react';
import validator from '../../utils/validator';
import API from '../../config';
import './SignUp.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      profileImage: '',
      email: '',
      password: '',
      checkPassword: '',
      name: '',
      sex: '',
      mobile: '',
      previewImage: '',
      isCheckedEmail: false,
      isClickedEmailButton: false,
      isCheckedMobile: false,
      isClickedMobileButton: false,
      isClickedSignUpButton: false,
    };
  }

  convertImageIntoFile = image => {
    const reader = new FileReader();
    const file = image;

    reader.onload = () => {
      this.setState({
        profileImage: file,
        previewImage: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleChangeInput = e => {
    if (e.target.name === 'profileImage') {
      this.convertImageIntoFile(e.target.files[0]);
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClickButton = e => {
    this.requestCheckDuplication(e.target.name);
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.setState({
      isClickedSignUpButton: true,
    });

    if (!this.validateAllInfomation()) return;

    this.requestSignUp();
  };

  validateAllInfomation = () => {
    const {
      email,
      password,
      checkPassword,
      name,
      sex,
      mobile,
      isClickedEmailButton,
      isClickedMobileButton,
    } = this.state;

    if (
      !validator.email(email) ||
      !validator.password(password) ||
      password !== checkPassword ||
      !name ||
      !sex ||
      !validator.mobile(mobile) ||
      !isClickedEmailButton ||
      !isClickedMobileButton
    ) {
      return;
    }

    return true;
  };

  requestSignUp = async () => {
    const { email, password, name, sex, mobile } = this.state;

    try {
      const res = await fetch(`${API.signup}/users/signup`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name,
          sex,
          mobile,
        }),
      });

      const result = await res.json();

      if (result.message === 'SUCCESS') {
        this.goToLoginPage();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  requestCheckDuplication = async checkValue => {
    try {
      const res = await fetch(`${API}/users/${checkValue}-check`, {
        method: 'POST',
        body: JSON.stringify({
          [checkValue]: this.state[checkValue],
        }),
      });

      const result = await res.json();

      if (checkValue === 'email') {
        if (result.message === 'SUCCESS') {
          this.setState({
            isCheckedEmail: true,
            isClickedEmailButton: true,
          });
        } else {
          this.setState({
            isClickedEmailButton: true,
          });
        }
        return;
      }

      if (checkValue === 'mobile') {
        if (result.message === 'SUCCESS') {
          this.setState({
            isCheckedMobile: true,
            isClickedMobileButton: true,
          });
        } else {
          this.setState({
            isClickedMobileButton: true,
          });
        }
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  goToLoginPage = () => {
    this.props.history.push('/login');
  };

  render() {
    const {
      email,
      password,
      checkPassword,
      name,
      sex,
      mobile,
      previewImage,
      isCheckedEmail,
      isClickedEmailButton,
      isCheckedMobile,
      isClickedMobileButton,
      isClickedSignUpButton,
    } = this.state;
    console.log(this.props.location);
    return (
      <div className="signup">
        <div className="title">
          <h3>JOIN</h3>
          <p>안녕하세요 선릉맥주입니다.</p>
        </div>
        <div className="profile-image">
          <img src={previewImage ? previewImage : '/images/profile.jpeg'} />
          <div className="upload-image">
            <i className="fas fa-camera-retro fa-lg"></i>
            <input
              id="upload"
              type="file"
              accept=".jpeg,.jpg,.png,.gif,.svg+xml"
              onChange={this.handleChangeInput}
              name="profileImage"
            />
          </div>
        </div>
        <form onSubmit={this.handleSubmitForm}>
          <div className="email">
            <div>
              <input
                type="text"
                placeholder="이메일"
                onChange={this.handleChangeInput}
                value={email}
                name="email"
              />
              <button
                type="button"
                name="email"
                onClick={this.handleClickButton}
              >
                중복확인
              </button>
            </div>
            {!validator.email(email) && email.length !== 0 && (
              <span>이메일이 올바르지 않습니다</span>
            )}
            {!isClickedEmailButton && isClickedSignUpButton && (
              <span>이메일 중복확인을 해주세요</span>
            )}
            {!isCheckedEmail && isClickedEmailButton && (
              <span>동일한 이메일이 존재합니다</span>
            )}
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="비밀번호: 10~15 자 문자, 숫자, 특수문자 조합"
              onChange={this.handleChangeInput}
              value={password}
              name="password"
              className={
                (!validator.email(email) && email.length !== 0) ||
                (!isClickedEmailButton && isClickedSignUpButton)
                  ? 'devide'
                  : 'non-devide'
              }
            />
            {((!validator.password(password) && password.length !== 0) ||
              (isClickedSignUpButton && password.length === 0)) && (
              <span>비밀번호가 올바르지 않습니다</span>
            )}
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={this.handleChangeInput}
              value={checkPassword}
              name="checkPassword"
              className={
                (!validator.password(password) && password.length !== 0) ||
                (isClickedSignUpButton && password.length === 0)
                  ? 'devide'
                  : 'non-devide'
              }
            />
            {((password !== checkPassword && checkPassword.length !== 0) ||
              (isClickedSignUpButton && checkPassword.length === 0)) && (
              <span>비밀번호가 올바르지 않습니다</span>
            )}
          </div>
          <div className="name">
            <p>이름</p>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              onChange={this.handleChangeInput}
              value={name}
              name="name"
            />
            {isClickedSignUpButton && name.length === 0 && (
              <span>이름이 올바르지 않습니다</span>
            )}
          </div>
          <div className="sex">
            <p>성별</p>
            <div>
              <label>
                <input
                  type="radio"
                  value="M"
                  name="sex"
                  onChange={this.handleChangeInput}
                />
                남자
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="F"
                  name="sex"
                  onChange={this.handleChangeInput}
                />
                여자
              </label>
            </div>
            {isClickedSignUpButton && sex.length === 0 && (
              <span>성별이 올바르지 않습니다</span>
            )}
          </div>
          <div className="mobile">
            <div>
              <p>연락처</p>
              <div className="mobile-input-container">
                <input
                  type="number"
                  placeholder="핸드폰 번호: 숫자만 입력하세요"
                  onChange={this.handleChangeInput}
                  value={mobile}
                  name="mobile"
                />
                <button
                  type="button"
                  name="mobile"
                  onClick={this.handleClickButton}
                >
                  중복확인
                </button>
              </div>
            </div>
            {!validator.mobile(mobile) && mobile.length !== 0 && (
              <span>핸드폰 번호가 올바르지 않습니다</span>
            )}
            {!isClickedMobileButton && isClickedSignUpButton && (
              <span>핸드폰 번호 중복확인을 해주세요</span>
            )}
            {!isCheckedMobile && isClickedMobileButton && (
              <span>동일한 핸드폰 번호가 존재합니다</span>
            )}
          </div>
          <button type="submit">가입하기</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
