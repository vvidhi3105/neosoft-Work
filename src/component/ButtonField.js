import React from "react";

const ButtonField = (props) => {
  return (
    <button className={props.className} onClick={() => props.onClick("hello")}>
      {props.buttonName}
    </button>
  );
};

export default ButtonField;
