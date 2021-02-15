import { Button, notification, Spin, Select, Input, Form } from "antd";
import React, { useState, useCallback } from "react";
import { listOfDays, locations, weekday } from "./Constants";
import Dropdown from "./Components/Dropdown";
import Logo from "./images/logo.png";
import "antd/dist/antd.css";
import "./App.css";

const axios = require("axios");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clubId, setClubId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState("None");
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

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSetClubId = useCallback(
    (e) => {
      setClubId(e);
      const club = locations.find((location) => location.clubId === Number(e));
      setProvince(club.province);
    },
    [clubId]
  );

  const handleBookingTimes = (value, day) => {
    // console.log(value, day);
    // create a deep copy
    const bookingTimeIntervalsCopy = JSON.parse(
      JSON.stringify(bookingTimeIntervals)
    );
    bookingTimeIntervalsCopy[day] = value;
    setBookingTimeIntervals(bookingTimeIntervalsCopy);
  };

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
      clubId,
      province,
    });
    return data;
  };

  // ** uncomment to deploy
  const onSubmit = async () => {
    const data = formatData();
    console.log(bookingTimeIntervals);
    setLoading(true);
    const res = await axios
      .post("https://goodlife-autobook-server.herokuapp.com/", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((e) => {
        setLoading(false);
        return e.data;
      });
    openNotification(res);
  };

  // ** Uncomment for local testing
  // const onSubmit = async () => {
  //   const data = formatData();
  //   console.log(bookingTimeIntervals);
  //   setLoading(true);
  //   const res = await axios
  //     .post("http://localhost:8000/", data, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((e) => {
  //       setLoading(false);
  //       return e.data;
  //     });
  //   openNotification(res);
  // };

  const onSubmitFailed = () => {
    console.log("failed to submit");
  };

  return (
    <div className="App">
      <div>
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <Form
        className="user-details"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Email" onChange={handleEmail} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" onChange={handlePassword} />
        </Form.Item>

        <Form.Item label="Club" name="club" rules={[{ required: true }]}>
          <Select
            className="dropdown-menus-container"
            onChange={handleSetClubId}
          >
            {locations.map((location) => {
              return (
                <Select.Option key={location.clubId}>
                  {location.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          className={clubId === 0 ? "form-dropdown-hidden" : "form-dropdown"}
        >
          <div className="dropdown-menus-container">
            <Dropdown
              listOfDays={listOfDays}
              handleBookingTimes={handleBookingTimes}
              province={province}
            />
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      {loading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
