import React from 'react';
import './Category.scss';
import Input from './Input/Input';

class Category extends React.Component {
  render() {
    const { categoryValue } = this.props;
    const renderSubCategory = () => {
      if (
        categoryValue === 'liquor' ||
        categoryValue === 'soju' ||
        categoryValue === 'beer' ||
        categoryValue === 'wine'
      ) {
        return (
          <div className="category-liquor">
            <Input
              categoryInputValue={categoryValue}
              value="soju"
              selectCategory={this.props.selectCategory}
              name="subCategory"
            />
            <Input
              categoryInputValue={categoryValue}
              value="beer"
              selectCategory={this.props.selectCategory}
              name="subCategory"
            />
            <Input
              categoryInputValue={categoryValue}
              value="wine"
              selectCategory={this.props.selectCategory}
              name="subCategory"
            />
          </div>
        );
      }
    };

    return (
      <div className="category">
        <div className="liquor-container">
          <Input
            categoryInputValue={categoryValue}
            value="liquor"
            selectCategory={this.props.selectCategory}
            name="mainCategory"
          />
          {renderSubCategory()}
        </div>
        <Input
          categoryInputValue={categoryValue}
          value="food"
          selectCategory={this.props.selectCategory}
          name="mainCategory"
        />
        <Input
          categoryInputValue={categoryValue}
          value="merchandise"
          selectCategory={this.props.selectCategory}
          name="mainCategory"
        />
      </div>
    );
  }
}

export default Category;
