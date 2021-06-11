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
    const { handelModal } = this.props;
    return (
      <div className="popup">
        <div className="popup-body">
          {this.props.children}
          <button className="cancel" onClick={handelModal}>
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  }
}
