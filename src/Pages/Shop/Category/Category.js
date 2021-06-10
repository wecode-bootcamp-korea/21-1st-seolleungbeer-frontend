import React from 'react';
import './Category.scss';
import Input from './Input/Input';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryInputValue: '',
      subCategoryInputValue: '',
    };
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { categoryInputValue, subCategoryInputValue } = this.state;
    console.log(categoryInputValue, subCategoryInputValue);
    return (
      <div className="category">
        <div className="liquor-container">
          <Input
            categoryInputValue={categoryInputValue}
            value="liquor"
            handleChangeInput={this.handleChangeInput}
            name="categoryInputValue"
          />
          {categoryInputValue === 'liquor' && (
            <div className="category-liquor">
              <Input
                categoryInputValue={subCategoryInputValue}
                value="soju"
                handleChangeInput={this.handleChangeInput}
                name="subCategoryInputValue"
              />
              <Input
                categoryInputValue={subCategoryInputValue}
                value="beer"
                handleChangeInput={this.handleChangeInput}
                name="subCategoryInputValue"
              />
              <Input
                categoryInputValue={subCategoryInputValue}
                value="wine"
                handleChangeInput={this.handleChangeInput}
                name="subCategoryInputValue"
              />
            </div>
          )}
        </div>
        <Input
          categoryInputValue={categoryInputValue}
          value="food"
          handleChangeInput={this.handleChangeInput}
          name="categoryInputValue"
        />
        <Input
          categoryInputValue={categoryInputValue}
          value="merchandise"
          handleChangeInput={this.handleChangeInput}
          name="categoryInputValue"
        />
      </div>
    );
  }
}

export default Category;
