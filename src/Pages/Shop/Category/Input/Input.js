import React from 'react';
import './Input.scss';

class Input extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { categoryValue, categoryInputValue, handleChangeInput } = this.props;
    // console.log(categoryValue, categoryValue);
    return (
      <div className={categoryValue}>
        <input
          type="radio"
          id={categoryValue}
          onChange={handleChangeInput}
          value={categoryValue}
          name="select-category"
        />
        <label
          htmlFor={categoryValue}
          className={
            categoryInputValue === categoryValue ? 'checked' : 'non-checked'
          }
        />
        <span>{categoryValue[0].toUpperCase() + categoryValue.slice(1)}</span>
      </div>
    );
  }
}

export default Input;
