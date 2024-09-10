const readlinSync = require("readline-sync");
const {
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
} = require("./src/modules/customer.js");
const {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("./src/modules/product.js");
const {
  getOrder,
  addOrder,
  editOrder,
  deleteOrder,
} = require("./src/modules/purcharseOrder.js");
const {
  getPayment,
  addPayment,
  editPayment,
  deletePayment,
} = require("./src/modules/payment.js");
async function app() {
  try {
    await getPayment();
    // await editPayment(1, new Date(), "66.22", "Cash", 22);
    await deletePayment(2)
  } catch (e) {
    console.log(e.message);
  }
}

app();
