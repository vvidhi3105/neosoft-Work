import React from "react";
import { FaXmark } from "react-icons/fa6";
import ButtonField from "./ButtonField";

const ConfirmPopup = (props) => {
  return (
    <div id="popup">
      <div id="popup-content">
        <div className="close-popup">
          <FaXmark onClick={() => props.setPopupVisibility(false)} />
        </div>
        {props.message}
        <br />
        <div id="button-action-popup">
          <ButtonField
            buttonName="OK"
            onClick={() => props.handleDelete()}
            className="button-success"
          />
          &nbsp;&nbsp;&nbsp;
          <ButtonField
            buttonName="CANCEL"
            onClick={() => props.setPopupVisibility(false)}
            className="button-success"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
