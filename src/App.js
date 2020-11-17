import { Button, notification } from "antd";
import React, { useState } from "react";
import { listOfDays } from "./Constants";
import Dropdown from "./Components/Dropdown";
import "antd/dist/antd.css";
import "./App.css";

const axios = require("axios");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // indexed per day
  const [bookingTimeIntervals, setBookingTimeIntervals] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleBookingTimes(value, day) {
    // console.log(value, day);
    // create a deep copy
    const bookingTimeIntervalsCopy = JSON.parse(
      JSON.stringify(bookingTimeIntervals)
    );
    bookingTimeIntervalsCopy[day] = value;
    setBookingTimeIntervals(bookingTimeIntervalsCopy);
    console.log(bookingTimeIntervals);
  }

  let data = JSON.stringify({
    email,
    password,
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

  // local
  function onSubmit(e) {
    openNotification();
    console.log(e);
    // axios.post("http://localhost:8000/", data, {
    //   headers: { "Content-Type": "application/json" },
    // });
  }

  return (
    <div className="App">
      <input type="email" placeholder="username" onChange={handleEmail} />
      <input type="text" placeholder="password" onChange={handlePassword} />
      <Dropdown
        listOfDays={listOfDays}
        onChange={(value) => {
          handleBookingTimes(value, 0);
        }}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}

export default App;
// check user passwords to see if it works and make toast message
// post request and check if status 200
