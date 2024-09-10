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
      console.log("1. Display customer list");
      console.log("2. Add a customer");
      console.log("3. Update customer information");
      console.log("4. Delete a customer");
      console.log("5. Exit the customer menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          await getCustomer();
          break;
        case 2:
          const name = readlineSync.question("Enter customer name: ");
          const address = readlineSync.question("Enter customer address: ");
          const email = readlineSync.question("Enter customer email: ");
          const phone = readlineSync.question("Enter customer phone: ");
          await addCustomer(name, address, email, phone);
          break;
        case 3:
          const id = readlineSync.question("Enter customer ID: ");
          const newName = readlineSync.question(
            "Enter the new customer name: "
          );
          const newAddress = readlineSync.question("Enter the new address: ");
          const newEmail = readlineSync.question("Enter the new email: ");
          const newPhone = readlineSync.question(
            "Enter the new phone number: "
          );
          await editCustomer(id, newName, newAddress, newEmail, newPhone);
          break;
        case 4:
          const iD = readlineSync.question("Enter customer ID: ");
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
      console.log("1. Display product list");
      console.log("2. Add a product");
      console.log("3. Update product information");
      console.log("4. Delete a product");
      console.log("5. Exit the product menu");
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
          const price = readlineSync.question("Enter product price: ");
          const stock = readlineSync.question("Enter product stock: ");
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
          const id = readlineSync.question("Enter product ID: ");
          const newName = readlineSync.question("Enter the new product name: ");
          const newDescription = readlineSync.question(
            "Enter the new product description: "
          );
          const newPrice = readlineSync.question(
            "Enter the new product price: "
          );
          const newStock = readlineSync.question(
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
          const iD = readlineSync.question("Enter product ID: ");
          await deleteProduct(iD);
          break;
        case 5:
          console.log("Exiting the product menu...");
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
      console.log("1. Display purcharse order list");
      console.log("2. Add a purcharse order");
      console.log("3. Update purcharse order information");
      console.log("4. Delete a purcharse order");
      console.log("5. Exit the order menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          await getOrder();
          break;
        case 2:
          const name = readlineSync.question("Enter product name: ");
          const description = readlineSync.question(
            "Enter product description: "
          );
          const date = readlineSync.question("Enter order date: ");
          const deliveryAddress = readlineSync.question(
            "Enter oder deliveryAddress: "
          );
          const customerId = readlineSync.question(
            "Enter customer customerId: "
          );
          const tackNumer = readlineSync.question("Enter order tackNumer: ");
          const status = readlineSync.question("Enter order status: ");
          await addOrder(date, deliveryAddress, customerId, tackNumer, status);
          break;
        case 3:
          const id = readlineSync.question("Enter order id: ");
          const newDate = readlineSync.question("Enter order date: ");
          const newDeliveryAddress = readlineSync.question(
            "Enter oder deliveryAddress: "
          );
          const newCustomerId = readlineSync.question(
            "Enter customer customerId: "
          );
          const newTackNumer = readlineSync.question("Enter order tackNumer: ");
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
          const iD = readlineSync.question("Enter order ID: ");
          await deleteOrder(iD);
          break;
        case 5:
          console.log("Exiting the product menu...");
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
      console.log("1. Display payment list");
      console.log("2. Add a payment");
      console.log("3. Update payment information");
      console.log("4. Delete a payment");
      console.log("5. Exit the payment menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          await getPayment();
          break;
        case 2:
          const date = readlineSync.question("Enter payment date: ");
          const amount = readlineSync.question("Enter payment amount: ");
          const paymentMethod = readlineSync.question("Enter payment payment method: ");
          const orderId = readlineSync.question("Enter order id: ");
          await addPayment(date, amount, paymentMethod, orderId)
          break;
        case 3:
          const id = readlineSync.question("Enter payment id: ");
          const newdate = readlineSync.question("Enter payment new date: ");
          const newamount = readlineSync.question("Enter payment new amount: ");
          const newpaymentMethod = readlineSync.question("Enter payment  method: ");
          const neworderId = readlineSync.question("Enter order id: ");
          await editPayment(id, newdate, newamount, newpaymentMethod, neworderId)
          break;
        case 4:
          const iD = readlineSync.question("Enter customer ID: ");
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