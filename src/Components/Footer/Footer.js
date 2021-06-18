import React from 'react';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-nav">
          <div className="footer-nav-title">
            <div>
              <span className="color">ABOUT US</span>
            </div>
            <div>
              <span className="color">OUT BEERS</span>
            </div>
            <div>
              <span className="color">NEWS</span>
            </div>
            <div>
              <span>CONTACT</span>
            </div>
            <div>
              <span>RECRUIT</span>
            </div>
            <div>
              <span>NOTICE</span>
            </div>
          </div>
          <div className="footer-nav-icon">
            <i class="fab fa-youtube fa-3x"></i>
            <input placeholder="선릉 맥주" />
            <button>
              <i class="fas fa-search fa-lg"></i>
            </button>
            <i class="fab fa-facebook-square fa-3x"></i>
          </div>
        </div>
        <div className="footer-description">
          <div>
            <p>
              선릉맥주 주식회사&nbsp;&nbsp;&nbsp;대표이사{' '}
              <span className="color">김정연</span>
            </p>
            <p>본사) 서울특별시 강남구 테헤란로 427 위워크 타워</p>
            <p>
              호스팅 제공자 (주)<span className="color">김경천</span>
              &nbsp;&nbsp;&nbsp;사업자등록번호 123-45-678910&nbsp;&nbsp;&nbsp;
              통신판매업신고번호 제 2021-강남선릉-9999호
            </p>
            <p>
              개인정보보호책임자 <span className="color">황복실</span>
              &nbsp;&nbsp;&nbsp;고객센터 02-1234-5678
            </p>
            <p>COPYRIGHT 2021@SEOLLEUNG BEER COMPANY</p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Footer;
