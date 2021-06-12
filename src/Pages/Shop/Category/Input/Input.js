import React from 'react';
import './Input.scss';

class Input extends React.Component {
  handleChangeInput = e => {
    if (e.target.name === 'subCategory') {
      this.props.selectCategory(this.props.category, e.target.value);
    } else {
      this.props.selectCategory(e.target.value);
    }
  };

  render() {
    const { value, category, subCategory, name } = this.props;
    return (
      <div className={value}>
        <input
          className="category-input"
          type="radio"
          id={value}
          onChange={this.handleChangeInput}
          value={value}
          name={name}
        />
        <label
          htmlFor={value}
          className={
            category === value || subCategory === value
              ? 'checked'
              : 'non-checked'
          }
        />
        <span>{value[0].toUpperCase() + value.slice(1)}</span>
      </div>
    );
  }
}

export default Input;
