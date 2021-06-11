import React from 'react';
import './Popup.scss';

export default class BasketPopup extends React.Component {
  componentDidMount = () => {
    document.body.style.overflow = 'hidden';
  };

  componentWillUnmount = () => {
    document.body.style.overflow = 'auto';
  };

  render() {
    const { handelModal, isUsed } = this.props;

    return (
      <div className="popup">
        <div className="popup-body">
          <div className="child">
            {this.props.children}
            {isUsed && (
              <button className="cancel" onClick={handelModal}>
                <i class="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
