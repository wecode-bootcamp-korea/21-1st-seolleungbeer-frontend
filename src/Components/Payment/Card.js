import React from 'react';
import './Card.scss';

class Card extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="card">
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Card;
