import React from 'react';
import Item from '../Item/Item';
import './ItemList.scss';

class ItemList extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div className="item-list">
        <ul>
          {items.map(item => (
            <Item
              key={item.id}
              price={item.price}
              koreanName={item.korean_name}
              englishName={item.english_name}
              description={item.description}
              imgUrl={item.img_url}
            />
          ))}
        </ul>
        <button>LOAD MORE</button>
      </div>
    );
  }
}

export default ItemList;
