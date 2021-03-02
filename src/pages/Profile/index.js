import { notification, Select, Input, Form } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useCallback, lazy } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  loadStripe,
} from "@stripe/react-stripe-js";
import { listOfDays, locations, weekday } from "../../Constants";
import Dropdown from "../../components/Dropdown/Dropdown";
import Loading from "../../components/Loading/Loading";
import "antd/dist/antd.css";
import "./Profile.css";

const Button = lazy(() => import("../../common/Button"));
const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const axios = require("axios");

const Profile = () => {
  const { user } = useAuth0();
  const { sub, email } = user;
  const [userid, setUserid] = useState(sub);
  const [goodlifeEmail, goodlifeSetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clubId, setClubId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState("None");
  const stripe = useStripe();
  const elements = useElements();

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

  const handleGoodlifeEmail = (e) => {
    goodlifeSetEmail(e.target.value);
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
      userid,
      email: goodlifeEmail,
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
  // const onSubmit = async () => {
  //   const data = formatData();
  //   // console.log(bookingTimeIntervals);
  //   setLoading(true);
  //   const res = await axios
  //     .post("https://goodlife-autobook-server.herokuapp.com/", data, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((e) => {
  //       setLoading(false);
  //       return e.data;
  //     });
  //   openNotification(res);
  // };

  // ** Uncomment for local testing
  const onSubmit = async () => {
    console.log("userdata", user);
    const data = formatData();
    console.log(bookingTimeIntervals);
    setLoading(true);

    const checkIfUserExists = await axios.get(
      "http://localhost:8000/users/" + sub
    );

    if (checkIfUserExists) {
      const paymentPortal = await axios.post(
        "http://localhost:8000/create-checkout-session",
        {
          email,
        }
      );
      console.log(paymentPortal.data);
      stripe.redirectToCheckout({ sessionId: paymentPortal.data.id });
      // const res = await axios
      //   .post("http://localhost:8000/", data, {
      //     headers: { "Content-Type": "application/json" },
      //   })
      //   .then((e) => {
      //     setLoading(false);
      //     return e.data;
      //   });
      // openNotification(res);
    } else {
    }
  };

  const onSubmitFailed = () => {
    console.log("failed to submit");
  };

  return (
    <div className="booking-form">
      <div className="logo">
        <SvgIcon
          className="logo"
          src="logo.svg"
          aria-label="homepage"
          width="101px"
          height="64px"
        />
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
          <Input placeholder="Email" onChange={handleGoodlifeEmail} />
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

      {loading ? <Loading /> : <></>}
    </div>
  );
};

export default Profile;
