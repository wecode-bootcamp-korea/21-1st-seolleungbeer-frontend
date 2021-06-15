import React from 'react';
import './EmptyList.scss';

class EmptyList extends React.Component {
  render() {
    return (
      <div className="empty-list">
        <div>
          <span>상품이 존재하지 않습니다.</span>
        </div>
      </div>
    );
  }
}

export default EmptyList;
