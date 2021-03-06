const axios = require("axios");

/* 
@params: auth0 userId
@response: boolean
*/
export const checkIfUserExists = async (userId) => {
  const userExists = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/users/${userId}`
  );

  if (typeof userExists.data === "boolean") {
    return userExists.data;
  }

  return null;
};

/* 
@params: email, auth0 userId
@response: stripe customer object
*/
export const createCustomer = async (email, authUserId) => {
  const customer = await axios.post(
    `${process.env.REACT_APP_DOMAIN}/payments/create-customer`,
    { email, authUserId }
  );
  // debugger;
  return customer.data;
};

/* 
@params: email, stripe customerId, auth0 userId
@response: stripe checkout session object
*/
export const createCheckout = async (email, customerId, authUserId) => {
  const checkout = await axios.post(
    `${process.env.REACT_APP_DOMAIN}/payments/create-checkout`,
    { email, customerId, authUserId }
  );

  return checkout.data;
};
