import React from 'react';
import API from '../../config';
import Category from './Category/Category';
import EmptyList from './EmptyList/EmptyList';
import ItemList from './ItemList/ItemList';
import LoadingList from './LoadingList/LoadingList';
import './Shop.scss';

class Shop extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      category: '',
      subCategory: '',
      offset: 0,
      limit: 6,
      isLast: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentDidUpdate(_, prevState) {
    const { category, subCategory } = this.state;

    if (
      prevState.category !== category ||
      prevState.subCategory !== subCategory
    ) {
      this.setState(
        {
          items: [],
          offset: 0,
          isLast: false,
          isLoading: true,
        },
        () => {
          this.fetchItems(this.state.offset, category, subCategory);
        }
      );
    }
  }

  fetchItems = async (offset = 0, category = '', subCategory = '') => {
    if (this.state.isLast) return;

    try {
      const res = await fetch(
        `${API}/products?category=${
          category === 'all' ? '' : category
        }&subcategory=${subCategory}&offset=${
          offset * this.state.limit
        }&limit=${this.state.limit}`,
        {
          method: 'GET',
        }
      );

      const result = await res.json();
      const items = result.content;
      const lastPageMessage = result.is_last_page;

      //더 불러올 아이템이 없는 경우
      if (lastPageMessage) {
        this.setState({
          isLast: true,
        });
      }

      //제품이 없는 경우
      if (items === []) {
        this.setState({
          items: [],
          isLoading: false,
        });
        return;
      }

      this.setState({
        items: [...this.state.items, ...items],
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        items: [],
        isLoading: false,
      });
    }
  };

  selectCategory = (category, subCategory = '') => {
    this.setState({
      category,
      subCategory,
    });
  };

  moreLoadItems = () => {
    const { category, subCategory } = this.state;
    this.setState(
      {
        offset: this.state.offset + 1,
      },
      () => this.fetchItems(this.state.offset, category, subCategory)
    );
  };

  render() {
    const { category, subCategory, items, isLast, isLoading } = this.state;
    return (
      <div className="shop">
        <Category
          selectCategory={this.selectCategory}
          category={category}
          subCategory={subCategory}
        />
        {items.length > 0 && (
          <ItemList
            items={items}
            moreLoadItems={this.moreLoadItems}
            isLast={isLast}
          />
        )}
        {items.length <= 0 && isLoading && <LoadingList />}
        {items.length <= 0 && !isLoading && <EmptyList />}
      </div>
    );
  }
}

export default Shop;
