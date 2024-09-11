const readlineSync = require("readline-sync");

const {
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
} = require("./customer.js");

const {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("./product.js");

const {
  getOrder,
  addOrder,
  editOrder,
  deleteOrder,
} = require("./purcharseOrder.js");
const { getPayment, addPayment, editPayment, deletePayment } = require("./payment.js");

async function customer() {
  try {
    let choose = 0;
    while (choose !== 5) {
      console.log("\n  ==========Customer Menu==========");
      console.log("  1. Display customer list");
      console.log("  2. Add a customer");
      console.log("  3. Update customer information");
      console.log("  4. Delete a customer");
      console.log("  5. Exit the customer menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          await getCustomer();
          break;
        case 2:
          const name = readlineSync.question("Enter customer name: ");
          const address = readlineSync.question("Enter customer address: ");
          const email = readlineSync.questionEMail("Enter customer email: ");
          const phone = readlineSync.question("Enter customer phone: ");
          await addCustomer(name, address, email, phone);
          break;
        case 3:
          const id = readlineSync.questionInt("Enter customer ID: ");
          const newName = readlineSync.question(
            "Enter the new customer name: "
          );
          const newAddress = readlineSync.question("Enter the new address: ");
          const newEmail = readlineSync.questionEMail("Enter the new email: ");
          const newPhone = readlineSync.question(
            "Enter the new phone number: "
          );
          await editCustomer(id, newName, newAddress, newEmail, newPhone);
          break;
        case 4:
          const iD = readlineSync.questionInt("Enter customer ID: ");
          await deleteCustomer(iD);
          break;
        case 5:
          console.log("\nExiting the customer menu...\n");
          break;
        default:
          console.log("\nYou did not choose a valid option\n");
          break;
      }
    }
  } catch (e) {
    throw e.message;
  }
}

async function product() {
  try {
    let choose = 0;
    while (choose !== 5) {
      console.log("\n  ==========Product Menu==========");
      console.log("  1. Display product list");
      console.log("  2. Add a product");
      console.log("  3. Update product information");
      console.log("  4. Delete a product");
      console.log("  5. Exit the product menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          await getProduct();
          break;
        case 2:
          const name = readlineSync.question("Enter product name: ");
          const description = readlineSync.question(
            "Enter product description: "
          );
          const price = readlineSync.questionFloat("Enter product price: ");
          const stock = readlineSync.questionInt("Enter product stock: ");
          const category = readlineSync.question("Enter product category: ");
          const barcode = readlineSync.question("Enter product barcode: ");
          const status = readlineSync.question("Enter product status: ");
          await addProduct(
            name,
            description,
            price,
            stock,
            category,
            barcode,
            status
          );
          break;
        case 3:
          const id = readlineSync.questionInt("Enter product ID: ");
          const newName = readlineSync.question("Enter the new product name: ");
          const newDescription = readlineSync.question(
            "Enter the new product description: "
          );
          const newPrice = readlineSync.questionFloat(
            "Enter the new product price: "
          );
          const newStock = readlineSync.questionInt(
            "Enter the new product stock: "
          );
          const newCategory = readlineSync.question(
            "Enter the new product category: "
          );
          const newBarcode = readlineSync.question(
            "Enter the new product barcode: "
          );
          const newStatus = readlineSync.question(
            "Enter the new product status: "
          );
          await editProduct(
            id,
            newName,
            newDescription,
            newPrice,
            newStock,
            newCategory,
            newBarcode,
            newStatus
          );
          break;
        case 4:
          const iD = readlineSync.questionInt("Enter product ID: ");
          await deleteProduct(iD);
          break;
        case 5:
          console.log("\nExiting the product menu...\n");
          break;
        default:
          console.log("\nYou did not choose a valid option\n");
          break;
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function purcharseOrder() {
  try {
    let choose = 0;
    while (choose !== 5) {
      console.log("\n  ==========Order Menu==========");
      console.log("  1. get purcharse order");
      console.log("  2. Add a purcharse order");
      console.log("  3. Update purcharse order information");
      console.log("  4. Delete a purcharse order");
      console.log("  5. Exit the order menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          const ids = readlineSync.questionInt("Enter id order: ")
          await getOrder(ids);
          break;
        case 2:
          const date = readlineSync.question("Enter order date (YYY-MM-DD): ");
          const deliveryAddress = readlineSync.question(
            "Enter oder delivery address: "
          );
          const customerId = readlineSync.questionInt(
            "Enter customer customer id: "
          );
          const tackNumer = readlineSync.question("Enter order TRACK Number: ");
          const status = readlineSync.question("Enter order status: ");
          await addOrder(date, deliveryAddress, customerId, tackNumer, status);
          break;
        case 3:
          const id = readlineSync.questionInt("Enter order id: ");
          const newDate = readlineSync.question("Enter order date (YYY-MM-DD): ");
          const newDeliveryAddress = readlineSync.question(
            "Enter oder delivery address: "
          );
          const newCustomerId = readlineSync.questionInt(
            "Enter customer customer id: "
          );
          const newTackNumer = readlineSync.question("Enter order TRACK Number: ");
          const newStatus = readlineSync.question("Enter order status: ");
          await editOrder(
            id,
            newDate,
            newDeliveryAddress,
            newCustomerId,
            newTackNumer,
            newStatus
          );
          break;
        case 4:
          const iD = readlineSync.questionInt("Enter order ID: ");
          await deleteOrder(iD);
          break;
        case 5:
          console.log("\nExiting the purcharse order menu...\n");
          break;
        default:
          console.log("\nYou did not choose a valid option\n");
          break;
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}


async function payment() {
  try {
    let choose = 0;
    while (choose !== 5) {
      console.log("\n  ==========Payment Menu==========");
      console.log("  1. Display payment list");
      console.log("  2. Add a payment");
      console.log("  3. Update payment information");
      console.log("  4. Delete a payment");
      console.log("  5. Exit the payment menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          await getPayment();
          break;
        case 2:
          const date = readlineSync.question("Enter payment date (YYY-MM-DD): ");
          const amount = readlineSync.questionFloat("Enter payment amount: ");
          const paymentMethod = readlineSync.question("Enter payment payment method: ");
          const orderId = readlineSync.questionInt("Enter order id: ");
          await addPayment(date, amount, paymentMethod, orderId)
          break;
        case 3:
          const id = readlineSync.questionInt("Enter payment id: ");
          const newdate = readlineSync.question("Enter payment new date (YYY-MM-DD): ");
          const newamount = readlineSync.questionFloat("Enter payment new amount: ");
          const newpaymentMethod = readlineSync.question("Enter payment  method: ");
          const neworderId = readlineSync.questionInt("Enter order id: ");
          await editPayment(id, newdate, newamount, newpaymentMethod, neworderId)
          break;
        case 4:
          const iD = readlineSync.questionInt("Enter customer ID: ");
          await deletePayment(iD);
          break;
        case 5:
          console.log("\nExiting the payment menu...\n");
          break;
        default:
          console.log("\nYou did not choose a valid option\n");
          break;
      }
    }
  } catch (e) {
    throw e.message;
  }
}


module.exports ={customer, product, purcharseOrder, payment}