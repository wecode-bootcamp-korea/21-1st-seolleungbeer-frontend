import React from 'react';
import './Input.scss';

class Input extends React.Component {
  render() {
    const { value, categoryInputValue, selectCategory, name } = this.props;
    return (
      <div className={value}>
        <input
          className="category-input"
          type="radio"
          id={value}
          onChange={e => selectCategory(e.target.value)}
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
