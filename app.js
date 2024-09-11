const {
  customer,
  product,
  purcharseOrder,
  payment,
} = require("./src/modules/storeManagement.js");
const readlinSync = require("readline-sync");

async function menu() {
  console.log(`
  =======Main Menu=======`);
  console.log("1. Customer management");
  console.log("2. Product management");
  console.log("3. Order management");
  console.log("4. Payment management");
  console.log("0. Quit the program");
  const choice = readlinSync.questionInt("\nChoose an option: ");
  return choice;
}

async function app() {
  try {
    let choice = null;
    while (choice !== 0) {
      choice = await menu();
      switch (choice) {
        case 1:
          await customer();
          break;
        case 2:
          await product();
          break;
        case 3:
          await purcharseOrder();
          break;
        case 4:
          await payment();
          break;
        case 0:
          console.log("\nExiting the Program...\n");
          break;
        default:
          console.log("\nYou did not choose a valid option");
          break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

app();
