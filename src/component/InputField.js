import React from "react";

const InputField = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={(data) => props.onChange(data)}
        value={props.value}
        name={props.name}
        className="form-control"
      />
    </div>
  );
};

export default InputField;
