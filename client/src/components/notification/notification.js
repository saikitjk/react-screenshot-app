import React from "react";
import { Alert } from "reactstrap";
import "./notification.css";

export default function notification(props) {
  return (
    <div>
      <div>
        {props.displayInfoMsg ? (
          <Alert color="info">{props.message}</Alert>
        ) : null}
      </div>
      <div>
        {props.displayErrorMsg ? (
          <Alert color="danger">{props.message}</Alert>
        ) : null}
      </div>
    </div>
  );
}
