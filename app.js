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
const readlinSync = require("readline-sync");

async function app() {
  try {
    await getOrder()
    // await addOrder(new Date(), '123 Main St, Cityville', 2, 'TRACK0d05336', 'shipped')
    // await editOrder(4, new Date(), 'Khabou ', 1, 'TRACK2256', 'shipped')
  } catch (e) {
    console.log(e.message);
  }
}

app();
