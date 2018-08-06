import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label for={props.firstName} className="form-label">
        {props.title}
      </label>
      <input
        className="form-control"
        id={props.firstName}
        name={props.firstName}
        type={props.inputType}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
