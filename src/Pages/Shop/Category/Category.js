import React from 'react';
import './Category.scss';
import Input from './Input/Input';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryInputValue: '',
    };
  }

  handleChangeInput = e => {
    // console.log(e.target.value);
    this.setState({
      categoryInputValue: e.target.value,
    });
  };

  render() {
    const { categoryInputValue } = this.state;
    console.log(categoryInputValue);
    return (
      <div className="category">
        <div className="liquor-container">
          <Input
            categoryInputValue={categoryInputValue}
            categoryValue={'liquor'}
            handleChangeInput={this.handleChangeInput}
          />
          {categoryInputValue === 'liquor' && (
            <div className="category-liquor">
              <Input
                categoryInputValue={categoryInputValue}
                categoryValue={'soju'}
                handleChangeInput={this.handleChangeInput}
              />
              <Input
                categoryInputValue={categoryInputValue}
                categoryValue={'beer'}
                handleChangeInput={this.handleChangeInput}
              />
              <Input
                categoryInputValue={categoryInputValue}
                categoryValue={'wine'}
                handleChangeInput={this.handleChangeInput}
              />
            </div>
          )}
        </div>
        <Input
          categoryInputValue={categoryInputValue}
          categoryValue={'food'}
          handleChangeInput={this.handleChangeInput}
        />
        <Input
          categoryInputValue={categoryInputValue}
          categoryValue={'merchandise'}
          handleChangeInput={this.handleChangeInput}
        />
      </div>
    );
  }
}

export default Category;
