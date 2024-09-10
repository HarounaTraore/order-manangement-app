const { getCustomer, addCustomer } = require("./customer.js");
const readlinSync = require("readline-sync");

async function add() {
  const name = readlinSync.question(`Enter customer name: `);
  const address = readlinSync.question(`Enter customer name: `);
  const email = readlinSync.question(`Enter customer name: `);
  const phone = readlinSync.question(`Enter customer name: `);
  return { name, address, email, phone };
}
