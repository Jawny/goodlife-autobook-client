const axios = require("axios");

// Return true if authUserId exists in DB, else return false
const checkIfRegistered = async (authUserId) => {
  const isRegistered = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/users/${authUserId}`
  );
  debugger;
  if (isRegistered) {
    return true;
  }

  return false;
};

module.exports = {
  checkIfRegistered,
};
