import React from "react";
import "./index.css";

const header = (props) => {
  return (
    <div>
      <div className="header">
        <div className="user"> Current User:{props.username}</div>
        <h1 className="kbc">
          KBC <sub className="rel">Reloaded</sub>
        </h1>
      </div>
    </div>
  );
};

export default header;
