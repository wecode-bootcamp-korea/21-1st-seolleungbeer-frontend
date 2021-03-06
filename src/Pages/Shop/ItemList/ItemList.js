import React from 'react';
import Item from '../Item/Item';
import './ItemList.scss';

class ItemList extends React.Component {
  render() {
    const { items, moreLoadItems, isLast } = this.props;
    return (
      <div className="item-list">
        <ul>
          {items.map(item => (
            <Item
              key={item.product_id}
              productId={item.product_id}
              price={item.price}
              koreanName={item.korean_name}
              englishName={item.english_name}
              mainImage={item.main_image}
            />
          ))}
        </ul>
        <button
          onClick={moreLoadItems}
          className={isLast ? 'no-more' : 'load-more'}
        >
          {isLast ? 'NO MORE' : 'LOAD MORE'}
        </button>
      </div>
    );
  }
}

export default ItemList;
