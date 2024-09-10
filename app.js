const {
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
} = require("./src/modules/customer.js");
const readlinSync = require("readline-sync");

async function app() {
  try {
    await getCustomer();
    // await addCustomer("harouna", "Couha", "HAQT@yahoo.com", "00");
    // await editCustomer(67, 'Samba Traore', 'NETECK', 'sb@gmail.com', '2032614123')
    // await deleteCustomer(2);
  } catch (e) {
    console.log(e.message);
  }
}

app();
