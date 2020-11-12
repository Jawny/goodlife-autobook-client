import { Button, notification } from "antd";
import React, { useState } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const axios = require("axios");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);

  const { Option } = Select;
  const weekday = [
    { value: null, text: "None" },
    { value: "6:00AM", text: "6:00AM - 7:00AM" },
    { value: "7:30AM", text: "7:30AM - 8:00AM" },
    { value: "9:00AM", text: "9:00AM - 10:00AM" },
    { value: "10:30AM", text: "10:30AM - 11:30AM" },
    { value: "12:00PM", text: "12:00PM - 1:00PM" },
    { value: "1:30PM", text: "1:30PM - 2:30PM" },
    { value: "3:00PM", text: "3:00PM - 4:00PM" },
    { value: "4:30PM", text: "4:30PM - 5:30PM" },
    { value: "6:00PM", text: "6:00PM - 7:00PM" },
    { value: "7:30PM", text: "7:30PM - 8:30PM" },
    { value: "9:00PM", text: "9:00PM - 10:00PM" },
    { value: "10:30PM", text: "10:30PM - 11:30PM" },
  ];

  const weekend = [
    { value: null, text: "None" },
    { value: "7:00AM", text: "7:00AM - 8:00AM" },
    { value: "8:30AM", text: "8:30AM - 9:00AM" },
    { value: "10:00AM", text: "10:00AM - 11:00AM" },
    { value: "11:30AM", text: "11:30AM - 12:30PM" },
    { value: "1:00PM", text: "1:00PM - 2:00PM" },
    { value: "2:30PM", text: "2:30PM - 3:30PM" },
    { value: "4:00PM", text: "4:00PM - 5:00PM" },
    { value: "5:30PM", text: "5:30PM - 6:30PM" },
    { value: "7:00PM ", text: "7:00PM - 8:00PM" },
  ];

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleMonday(e) {
    setMonday(e);
    console.log(e);
  }

  function handleTuesday(e) {
    setTuesday(e);
    console.log(e);
  }

  function handleWednesday(e) {
    setWednesday(e);
    console.log(e);
  }

  function handleThursday(e) {
    setThursday(e);
    console.log(e);
  }

  function handleFriday(e) {
    setFriday(e);
    console.log(e);
  }

  function handleSaturday(e) {
    setSaturday(e);
    console.log(e);
  }

  function handleSunday(e) {
    setSunday(e);
    console.log(e);
  }
  let data = JSON.stringify({
    email,
    password,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  });

  const openNotification = () => {
    notification.open({
      message: "Registration Confirmed",
      description: "You are signed up for auto bookings",
    });
  };

  function onSubmit() {
    openNotification();
    axios.post("https://goodlife-autobook-server.herokuapp.com/", data, {
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="App">
      <input type="email" placeholder="username" onChange={handleEmail} />
      <input type="password" placeholder="password" onChange={handlePassword} />
      <div>
        <h2>Monday</h2>
        <Select defaultValue="None" onChange={handleMonday}>
          {weekday.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>
      <div>
        <h2>Tuesday</h2>
        <Select defaultValue="None" onChange={handleTuesday}>
          {weekday.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>
      <div>
        <h2>Wednesday</h2>
        <Select defaultValue="None" onChange={handleWednesday}>
          {weekday.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>
      <div>
        <h2>Thursday</h2>
        <Select defaultValue="None" onChange={handleThursday}>
          {weekday.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>
      <div>
        <h2>Friday</h2>
        <Select defaultValue="None" onChange={handleFriday}>
          {weekday.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>
      <div>
        <h2>Saturday</h2>
        <Select defaultValue="None" onChange={handleSaturday}>
          {weekend.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>
      <div>
        <h2>Sunday</h2>
        <Select defaultValue="None" onChange={handleSunday}>
          {weekend.map((data) => {
            return <Option value={data.value}>{data.text}</Option>;
          })}
        </Select>
      </div>

      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}

export default App;
