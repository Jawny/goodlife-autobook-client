import { AutoComplete, notification, Select, Input, Form } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, useCallback, lazy } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { listOfDays, locations, weekday } from "../../Constants";
import {
  checkIfUserExists,
  checkIfSubscriptionActive,
  createCustomer,
  createCheckout,
  getUserData,
  updateGoodlifeData,
} from "../../api";
import Dropdown from "../../components/Dropdown/Dropdown";
import Loading from "../../components/Loading/Loading";
import ProfileDetails from "../../components/ProfileDetails";
import FAQ from "../../components/FAQ";
import "antd/dist/antd.css";
import "./Profile.css";

const Button = lazy(() => import("../../common/Button"));
const SvgIcon = lazy(() => import("../../common/SvgIcon"));

const Profile = () => {
  const { user } = useAuth0();
  const { sub: userId, email, email_verified: verified } = user;
  const [goodlifeEmail, goodlifeSetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clubId, setClubId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState("None");
  const stripe = useStripe();

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
      setClubId(e.clubId);
      const club = locations.find(
        (location) => location.clubId === Number(e.clubId)
      );
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
    setLoading(false);
    if (result) {
      notification.open({
        message: "Registration Confirmed",
        description: "You are now signed up for auto-bookings!",
      });
    } else {
      notification.open({
        message: "Registration Failed",
        description: "Please check your credentials.",
      });
    }
  };

  const notificationMessage = (message, description) => {
    setLoading(false);
    notification.open({
      message,
      description,
    });
  };

  const onSubmit = async () => {
    setLoading(true);

    // ask user to verify email
    if (!verified) {
      notificationMessage(
        "Unverified Account",
        "Please check your email to verify your account."
      );
      return;
    }
    // Try to find user in the DB
    const userExists = await checkIfUserExists(userId);

    if (!userExists) {
      // Create customer
      const customer = await createCustomer(email, userId);
      // Initiate checkout for customer
      const checkoutSession = await createCheckout(email, customer.id, userId);
      stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      setLoading(true);
    }
    // check if status is valid
    const userData = await getUserData(userId);
    const customerId = userData.payment.customerId;
    const subId = userData.payment.subId;
    const subStatus = await checkIfSubscriptionActive(subId);

    if (subStatus.toLowerCase() !== "active") {
      // trigger billing portal to open
      const checkoutSession = await createCheckout(email, customerId, userId);
      stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      setLoading(true);
    }

    const goodlifeData = {
      authUserId: userId,
      authEmail: email,
      verified: verified,
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
    };

    const response = await updateGoodlifeData(goodlifeData);
    await openNotification(response);
  };

  const onSubmitFailed = () => {
    console.log("failed to submit");
  };

  return (
    <div className="profile-container">
      <ProfileDetails userId={userId} />
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
        <div className="warning">
          WE ARE NOT ASSOCIATED WITH GOODLIFE FITNESS. USE AT YOUR OWN RISK.
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
            <AutoComplete
              className="dropdown-menus-container"
              onSelect={(value, option) => {
                handleSetClubId(option);
              }}
              options={locations.map((location) => {
                return {
                  label: location.name,
                  value: location.name,
                  clubId: location.clubId,
                };
              })}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
            {/* <Select
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
            </Select> */}
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
      <FAQ />
    </div>
  );
};

export default Profile;
