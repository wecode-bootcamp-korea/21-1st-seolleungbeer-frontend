import React from 'react';
import './LoadingList.scss';

class LoadingList extends React.Component {
  render() {
    return (
      <div className="loading-list">
        <div>
          <span>로딩중...</span>
        </div>
      </div>
    );
  }
}

export default LoadingList;
