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
      const res = await fetch(`${API}/users/signup`, {
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
          <p>??????????????? ?????????????????????.</p>
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
                placeholder="?????????"
                onChange={this.handleChangeInput}
                value={email}
                name="email"
              />
              <button
                type="button"
                name="email"
                onClick={this.handleClickButton}
              >
                ????????????
              </button>
            </div>
            {!validator.email(email) && email.length !== 0 && (
              <span>???????????? ???????????? ????????????</span>
            )}
            {!isClickedEmailButton && isClickedSignUpButton && (
              <span>????????? ??????????????? ????????????</span>
            )}
            {!isCheckedEmail && isClickedEmailButton && (
              <span>????????? ???????????? ???????????????</span>
            )}
            {isCheckedEmail && validator.email(email) && (
              <span>??????????????? ??????????????????</span>
            )}
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="????????????: 10~15 ??? ??????, ??????, ???????????? ??????"
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
              <span>??????????????? ???????????? ????????????</span>
            )}
            <input
              type="password"
              placeholder="???????????? ??????"
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
              <span>??????????????? ???????????? ????????????</span>
            )}
          </div>
          <div className="name">
            <p>??????</p>
            <input
              type="text"
              placeholder="????????? ???????????????"
              onChange={this.handleChangeInput}
              value={name}
              name="name"
            />
            {isClickedSignUpButton && name.length === 0 && (
              <span>????????? ???????????? ????????????</span>
            )}
          </div>
          <div className="sex">
            <p>??????</p>
            <div>
              <label>
                <input
                  type="radio"
                  value="M"
                  name="sex"
                  onChange={this.handleChangeInput}
                />
                ??????
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
                ??????
              </label>
            </div>
            {isClickedSignUpButton && sex.length === 0 && (
              <span>????????? ???????????? ????????????</span>
            )}
          </div>
          <div className="mobile">
            <div>
              <p>?????????</p>
              <div className="mobile-input-container">
                <input
                  type="number"
                  placeholder="????????? ??????: ????????? ???????????????"
                  onChange={this.handleChangeInput}
                  value={mobile}
                  name="mobile"
                />
                <button
                  type="button"
                  name="mobile"
                  onClick={this.handleClickButton}
                >
                  ????????????
                </button>
              </div>
            </div>
            {!validator.mobile(mobile) && mobile.length !== 0 && (
              <span>????????? ????????? ???????????? ????????????</span>
            )}
            {!isClickedMobileButton && isClickedSignUpButton && (
              <span>????????? ?????? ??????????????? ????????????</span>
            )}
            {!isCheckedMobile && isClickedMobileButton && (
              <span>????????? ????????? ????????? ???????????????</span>
            )}
            {isCheckedMobile && validator.mobile(mobile) && (
              <span>??????????????? ????????? ???????????????</span>
            )}
          </div>
          <button type="submit">????????????</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
