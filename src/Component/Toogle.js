import React from "react";

export default function Toogle(props) {
  return (
    <div>
      <div className="form-check form-switch-secondary form-switch">
        <input
          checked={props.ownState ? true : false}
          onChange={props.onClick}
          className="form-check-input form-check-input-secondary"
          type="checkbox"
          id={props.name}
        />
        <label className="form-check-label" htmlFor={props.name}>
          {props.name}
        </label>
      </div>
    </div>
  );
}
