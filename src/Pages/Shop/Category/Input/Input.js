import React from 'react';
import './Input.scss';

class Input extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { value, categoryInputValue, handleChangeInput, name } = this.props;
    // console.log(value, value);
    return (
      <div className={value}>
        <input
          type="radio"
          id={value}
          onChange={handleChangeInput}
          value={value}
          name={name}
        />
        <label
          htmlFor={value}
          className={categoryInputValue === value ? 'checked' : 'non-checked'}
        />
        <span>{value[0].toUpperCase() + value.slice(1)}</span>
      </div>
    );
  }
}

export default Input;
