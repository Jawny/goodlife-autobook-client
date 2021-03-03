const { checkIfRegistered } = require("./checkIfRegistered");
const { checkIfSubscribed } = require("./checkIfSubscribed");
const {
  createCustomer,
  createCheckout,
  getCheckoutSessionStatus,
  createCustomerAndCheckoutFlow,
} = require("./paymentFlow");

module.exports = {
  checkIfRegistered,
  checkIfSubscribed,
  createCustomer,
  createCheckout,
  getCheckoutSessionStatus,
  createCustomerAndCheckoutFlow,
};
