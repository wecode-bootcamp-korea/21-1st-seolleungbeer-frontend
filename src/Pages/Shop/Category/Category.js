import React from 'react';
import './Category.scss';
import Input from './Input/Input';

class Category extends React.Component {
  render() {
    const { category, subCategory, selectCategory } = this.props;
    const renderSubCategory = () => {
      const inputProps = {
        category,
        subCategory,
        selectCategory,
        name: 'subCategory',
      };

      return (
        <div className="category-liquor">
          <Input {...inputProps} value="cocktail" />
          <Input {...inputProps} value="beer" />
          <Input {...inputProps} value="wine" />
        </div>
      );
    };

    return (
      <div className="category">
        <Input
          category={category}
          value="all"
          selectCategory={this.props.selectCategory}
          name="mainCategory"
        />
        <div className="liquor-container">
          <Input
            category={category}
            value="liquor"
            selectCategory={this.props.selectCategory}
            name="mainCategory"
          />
          {category === 'liquor' && renderSubCategory()}
        </div>
        <Input
          category={category}
          value="food"
          selectCategory={this.props.selectCategory}
          name="mainCategory"
        />
        <Input
          category={category}
          value="merchandise"
          selectCategory={this.props.selectCategory}
          name="mainCategory"
        />
      </div>
    );
  }
}

export default Category;
