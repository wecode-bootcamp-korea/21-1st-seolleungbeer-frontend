import React from 'react';
import Item from '../Item/Item';
import './ItemList.scss';

class ItemList extends React.Component {
  render() {
    return (
      <div className="itemList">
        <ul className="cart-lists">
          {this.props.items.map(item => (
            <Item
              item={item}
              key={item.order_item_id}
              orderItemId={item.order_item_id}
              deliveryCharge={item.delivery_charge}
              deliveryMethod={item.delivery_method}
              mainImage={item.main_image}
              koreanName={item.korean_name}
              amount={item.amount}
              paymentCharge={item.payment_charge}
              isChecked={item.isChecked}
              requestDeleteItem={this.props.requestDeleteItem}
              checkItems={this.props.checkItems}
              openQuantityForm={this.props.openQuantityForm}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
