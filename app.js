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
const readlinSync = require("readline-sync");

async function app() {
  try {
    // await addProduct('Dekstop', 'Laptop with 15GB ram', 2000.200, 200, 'Accesoiries', '1405434', 'Available')
    // await editProduct(1, 'BLALA', 'Laptop with 15GB ram', '2000.200', 200, 'Accesoiries', '1405434', 'Available')
    await getProduct();
    // await deleteProduct(3)
  } catch (e) {
    console.log(e.message);
  }
}

app();
