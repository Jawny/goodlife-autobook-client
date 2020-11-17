import React from "react";
import { weekday, weekend } from "../Constants";
import { Select } from "antd";
import "antd/dist/antd.css";

function Dropdown(props) {
  const { Option } = Select;
  const { onChange, listOfDays } = props;

  const renderOption = (data) => {
    return <Option value={data.value}>{data.text}</Option>;
  };

  return listOfDays.map((day) => {
    return (
      <div>
        <h2>{day.day}</h2>
        <Select defaultValue="None" onChange={onChange}>
          {day.isWeekDay
            ? weekday.map((data) => {
                return renderOption(data);
              })
            : weekend.map((data) => {
                return renderOption(data.text);
              })}
        </Select>
      </div>
    );
  });
}

export default Dropdown;
