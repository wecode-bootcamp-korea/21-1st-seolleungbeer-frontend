import React from 'react';
import Category from './Category/Category';
import ItemList from './ItemList/ItemList';
import './Shop.scss';

class Shop extends React.Component {
  constructor() {
    super();

    this.state = {
      categoryValue: '',
      items: [],
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    const res = await fetch('/Data/items.json', {
      method: 'GET',
    });

    const result = await res.json();
    console.log(result);
    this.setState({
      items: result,
    });
  };

  selectCategory = item => {
    this.setState({
      categoryValue: item,
    });
  };

  render() {
    console.log(this.state);
    const { categoryValue, items } = this.state;
    return (
      <div className="shop">
        {/* <Nav/> */}
        <Category
          selectCategory={this.selectCategory}
          categoryValue={categoryValue}
        />
        <ItemList items={items} />
        {/* <Footer/> */}
        <div className="footer"></div>
      </div>
    );
  }
}

export default Shop;
