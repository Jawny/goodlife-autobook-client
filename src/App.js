import { Button, notification, Spin } from "antd";
import React, { useState } from "react";
import { listOfDays } from "./Constants";
import Dropdown from "./Components/Dropdown";
import Logo from "./images/logo.png";
import "antd/dist/antd.css";
import "./App.css";

const axios = require("axios");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
  }

  const openNotification = (result) => {
    if (result) {
      notification.open({
        message: "REGISTRATION CONFIRMED",
        description: "YOU ARE SIGNED UP FOR AUTO BOOKINGS",
      });
    } else {
      notification.open({
        message: "REGISTRATION FAILED",
        description: "PLEASE CHECK CREDENTIALS AGAIN",
      });
    }
  };

  const formatData = () => {
    const data = JSON.stringify({
      email,
      password,
      monday: bookingTimeIntervals[0],
      tuesday: bookingTimeIntervals[1],
      wednesday: bookingTimeIntervals[2],
      thursday: bookingTimeIntervals[3],
      friday: bookingTimeIntervals[4],
      saturday: bookingTimeIntervals[5],
      sunday: bookingTimeIntervals[6],
    });
    return data;
  };

  const onSubmit = async () => {
    const data = formatData();
    setLoading(true);
    const result = await axios
      .post("https://goodlife-autobook-server.herokuapp.com/", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setLoading(false);
        return res;
      });
    openNotification(result.data);
  };

  // // local
  // const onSubmit = async () => {
  //   const data = formatData();
  //   console.log(bookingTimeIntervals);
  //   setLoading(true);
  //   const res = await axios
  //     .post("http://localhost:8000/", data, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then(() => {
  //       setLoading(false);
  //       return false;
  //     });
  //   openNotification(res.data);
  //   console.log(res.data);
  // };

  return (
    <div className="App">
      <div>
        <img src={Logo} alt="logo" className="logo" />
      </div>

      <input type="email" placeholder="username" onChange={handleEmail} />
      <input type="text" placeholder="password" onChange={handlePassword} />
      <div className="dropdown-menus-container">
        <Dropdown
          listOfDays={listOfDays}
          handleBookingTimes={handleBookingTimes}
        />
      </div>
      <Button onClick={onSubmit} disabled={loading}>
        Submit
      </Button>
      {loading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;
