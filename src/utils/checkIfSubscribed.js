const axios = require("axios");

// Return true if user is subscribed, else return false
const checkIfSubscribed = async (subscriptionId) => {
  const isSubscribed = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/payments/get-subscription-status`,
    { subscriptionId }
  );

  if (isSubscribed.status === "active") {
    return true;
  }

  return false;
};

module.exports = {
  checkIfSubscribed,
};
