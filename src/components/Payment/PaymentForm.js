import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import "./PaymentForm.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  //   const { user } = useAuth0();
  //   const { email } = user;
  const email = "test@test.com";
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    const { id } = paymentMethod;
    const response = await axios.post(
      "http://localhost:8000/create-customer-portal-session",
      { payment_method: id, email }
    );
    // if (!error) {
    //   try {
    //     const { id } = paymentMethod;
    //     const response = await axios.post("http://localhost:8000/payment", {
    //       payment_method: id,
    //       email,
    //     });
    //     const { clientSecret, status } = response.data;
    //     debugger;
    //     stripe.confirmCardPayment(clientSecret).then((result) => {
    //       debugger;
    //       if (result.error) {
    //         console.log(result.error);
    //         // display error message on ui
    //       } else if (
    //         result.paymentIntent &&
    //         result.paymentIntent.status === "succeeded"
    //       ) {
    //         debugger;
    //         console.log("we gucci");
    //         // setSuccess(true);
    //       }
    //     });
    //   } catch (error) {
    //     console.log("payment error", error);
    //   }
    // } else {
    //   console.log(error.message);
    // }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}></CardElement>
            </div>
          </fieldset>
          <button>pay</button>
        </form>
      ) : (
        <div>
          <h2>You just bought stuff</h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
