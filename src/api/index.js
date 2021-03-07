const axios = require("axios");

/* 
@function: checks if user exists in DB
@params: auth0 userId
@response: boolean
*/
export const checkIfUserExists = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/users/${userId}`
  );

  return response.data;
};

/* 
@function: get user data
@params: auth0 userId
@response: return userData
*/
export const getUserData = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/users/${userId}`
  );

  return response.data;
};

/* 
@function: checks if user has an active subscription
@params: subscriptionId
@response: boolean
*/
export const checkIfSubscriptionActive = async (subscriptionId) => {
  const subStatus = await axios.post(
    `${process.env.REACT_APP_DOMAIN}/payments/get-subscription-status`,
    { subscriptionId }
  );

  return subStatus.data;
  // if (typeof userExists.data === "boolean") {
  //   return userExists.data;
  // }

  // return null;
};

/* 
@function: Update goodlife credentials and schedule
@params: auth0 userId
@response: boolean
*/
export const updateGoodlifeData = async (goodlifeObj) => {
  const response = await axios.put(
    `${process.env.REACT_APP_DOMAIN}/users/update-user-goodlife`,
    goodlifeObj
  );

  if (response.data.status === 200) {
    return true;
  }

  return false;
};

/* 
@function: creates a stripe customer 
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
@function: creates a checkout session
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

/* 
@function: create billing portal session
@params: customer id
@response: return billing portal url link
*/
export const createBillingInformationPortal = async (customerId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_DOMAIN}/payments/update-billing-information`,
    { customerId }
  );

  return response.data;
};
