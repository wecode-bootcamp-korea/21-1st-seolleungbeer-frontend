import React from 'react';
import Item from '../Item/Item';
import './ItemList.scss';

class ItemList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="itemList">
        <ul className="cart-lists">
          {this.props.items.map(item => (
            <Item
              key={item.cart_id}
              id={item.cart_id}
              deliveryCharge={item.delivery_charge}
              deliveryMethod={this.delivery_method}
              image={item.product_image}
              name={item.korean_name}
              price={item.payment_charge}
              deleteItem={this.props.deleteItem}
              checkItems={this.props.checkItems}
              isCheckedAllItems={this.props.isCheckedAllItems}
              openQuantityForm={this.props.openQuantityForm}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
