import React from "react";

const Dropdown = (props) => {
  return (
    <div>
      <select
        value={props.value}
        className={props.className}
        onChange={(data) => props.onChange(data)}
        name={props?.name}
      >
        <option value="">{props.selectLabel}</option>
        {props.optionList?.map((item) => {
          return <option value={item.value}>{item.key}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
