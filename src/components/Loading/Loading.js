import { Spin } from "antd";
import React from "react";
import "./Loading.css";

const Loading = () => (
  <div className="spinner-container">
    <Spin className="spinner" size="large" />
  </div>
);

export default Loading;
