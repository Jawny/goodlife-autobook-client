import { useState, useEffect } from "react";
import { notification } from "antd";
import emailjs from "emailjs-com";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    emailjs
      .send(
        process.env.REACT_APP_MAIL_SERVICE_ID,
        process.env.REACT_APP_MAIL_TEMPLATE_ID,
        values,
        process.env.REACT_APP_MAIL_USER_ID
      )
      .then(
        function (response) {
          setShouldSubmit(true);
          openNotificationWithIcon("success");
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    // e.target.reset();
    // event.preventDefault();
    // setErrors(validate(values));
    // // Your url for API
    // const inbox = createInbox();
    // const url = `https://api.mailslurp.com/sendEmail?apiKey=${process.env.REACT_APP_MAIL_SLURP_API}`;
    // if (Object.keys(values).length === 3) {
    //   axios
    //     .post(url, {
    //       ...values,
    //     })
    //     .then(() => {
    //       setShouldSubmit(true);
    //     });
    // }
  };

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && shouldSubmit) {
  //     setValues("");
  //     openNotificationWithIcon("success");
  //   }
  // }, [errors, shouldSubmit]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
