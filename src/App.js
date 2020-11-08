import { Button } from "antd";
import React, { useState } from "react";
import "./App.css";

const axios = require("axios");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [year, setYear] = useState("");
  // const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // function handleYear(e) {
  //   setYear(e.target.value);
  // }

  // function handleMonth(e) {
  //   setMonth(e.target.value);
  // }

  // function handleDay(e) {
  //   setDay(e.target.value);
  // }

  function handleHour(e) {
    setHour(e.target.value);
  }
  let data = JSON.stringify({
    username,
    password,
    // year,
    // month,
    // day,
    hour,
  });

  function onSubmit() {
    axios.post("http://localhost:8080/", data, {
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="App">
      <input type="email" placeholder="username" onChange={handleUsername} />
      <input type="password" placeholder="password" onChange={handlePassword} />
      {/* <input type="text" placeholder="Year" onChange={handleYear} />
      <input type="text" placeholder="Month" onChange={handleMonth} />
      <input type="text" placeholder="Day" onChange={handleDay} /> */}
      <input type="text" placeholder="Hour" onChange={handleHour} />
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}

export default App;
