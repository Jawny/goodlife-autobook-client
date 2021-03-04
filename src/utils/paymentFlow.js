const axios = require("axios");

// Create Stripe customer and return customerId
const createCustomer = async (email, authUserId) => {
  const customer = await axios.post(
    `${process.env.REACT_APP_DOMAIN}/payments/create-customer`,
    { email, authUserId }
  );
  // debugger;
  return customer;
};

// Create a Stripe Checkout and return the checkout session object.
const createCheckout = async (email, customerId, authUserId) => {
  const checkout = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/payments/create-checkout`,
    { email, customerId, authUserId }
  );

  return checkout;
};

// Retrieve Stripe Checkout Session status will return either "paid" or "unpaid" or 404.
const getCheckoutSessionStatus = async (sessionId) => {
  const session = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/payments/get-checkout-session`,
    { sessionId }
  );

  return session.status;
};

const updateUserCheckoutSession = async (
  email,
  verified,
  userId,
  sessionId
) => {
  const res = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/users/update-checkout-session`,
    { email, verified, userId, sessionId }
  );
  debugger;
  if (res.status === 200) {
    return true;
  }

  return false;
};

// Create customer and return checkout session object
const createCustomerAndCheckoutFlow = async (email, verified, userId) => {
  try {
    const customer = await createCustomer(email);
    debugger;
    const checkout = await createCheckout(email, customer);
    debugger;
    //may fail here
    const test = await updateUserCheckoutSession(
      email,
      verified,
      userId,
      checkout.id
    );
    debugger;
    return checkout;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createCustomer,
  createCheckout,
  getCheckoutSessionStatus,
  createCustomerAndCheckoutFlow,
};
