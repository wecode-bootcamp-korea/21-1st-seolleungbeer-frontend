import React from 'react';
import Category from './Category/Category';
import ItemList from './ItemList/ItemList';

class Shop extends React.Component {
  render() {
    return (
      <div>
        {/* <Nav/> */}
        <Category />
        <ItemList />
        {/* <Footer/> */}
      </div>
    );
  }
}

export default Shop;
