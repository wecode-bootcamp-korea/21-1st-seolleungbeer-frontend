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
    const { handleModal, isUsed } = this.props;

    return (
      <div className="popup">
        <div className="popup-body">
          <div className="child">
            {this.props.children}
            {isUsed && (
              <button className="cancel" onClick={handleModal}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
