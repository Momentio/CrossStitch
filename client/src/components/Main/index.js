import React from 'react';
import "./index.css";

export default (props) => {
  return (
    <main className="main">
      {props.children}
    </main>
  );
}