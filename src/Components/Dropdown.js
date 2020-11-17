import React from "react";
import { weekday, weekend } from "../Constants";
import { Select } from "antd";
import "antd/dist/antd.css";

function Dropdown(props) {
  const { Option } = Select;
  const { listOfDays, handleBookingTimes } = props;

  const renderOption = (data) => {
    return <Option value={data.value}>{data.text}</Option>;
  };

  return listOfDays.map((day) => {
    return (
      <div>
        <h2>{day.day}</h2>
        <Select
          style={{ width: 180 }}
          defaultValue="None"
          onChange={(value) => {
            handleBookingTimes(value, day.dayIndex);
          }}
        >
          {day.isWeekDay
            ? weekday.map((data) => {
                return renderOption(data);
              })
            : weekend.map((data) => {
                return renderOption(data);
              })}
        </Select>
      </div>
    );
  });
}

export default Dropdown;
