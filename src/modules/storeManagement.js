const { pool, connection } = require("../db/db.js");
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
const {
  getPayment,
  addPayment,
  editPayment,
  deletePayment,
} = require("./payment.js");

async function customer() {
  try {
    const connection = await pool.getConnection();
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
          let name = readlineSync.question("Enter customer name: ");
          while (name == "") {
            console.log("\nPlease enter the customer's name....");
            name = readlineSync.question("Enter customer name: ");
          }
          let address = readlineSync.question("Enter customer address: ");
          while (address == "") {
            console.log("\nPlease enter the customer's address....");
            address = readlineSync.question("Enter customer address: ");
          }
          const email = readlineSync.questionEMail("Enter customer email: ");
          let phone = readlineSync.question("Enter customer phone: ");
          while (phone == "") {
            console.log("\nPlease enter the customer's phone....");
            phone = readlineSync.question("Enter customer phone: ");
          }
          await addCustomer(name, address, email, phone);
          break;
        case 3:
          let id = readlineSync.questionInt("Enter customer ID: ");
          let [rows] = await connection.execute(
            "SELECT * FROM customers WHERE id = ?",
            [id]
          );
          while (rows.length == 0) {
            console.log("\nThe id you entered does not match any Customer...");
            id = readlineSync.questionInt("Enter customer ID: ");
            [rows] = await connection.execute(
              "SELECT * FROM customers WHERE id = ?",
              [id]
            );
          }
          let newName = readlineSync.question("Enter the new customer name: ");
          while (newName == "") {
            console.log("\nPlease enter the customer's name....");
            newName = readlineSync.question("Enter the new customer name: ");
          }

          let newAddress = readlineSync.question("Enter the new address: ");
          while (newAddress == "") {
            console.log("\nPlease enter the customer's address....");
            newAddress = readlineSync.question("Enter the new address: ");
          }
          const newEmail = readlineSync.questionEMail("Enter the new email: ");
          let newPhone = readlineSync.question("Enter the new phone number: ");
          while (newPhone == "") {
            console.log("\nPlease enter the customer's phone....");
            newPhone = readlineSync.question("Enter the new phone number: ");
          }
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
    const connection = await pool.getConnection();
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
          let name = readlineSync.question("Enter product name: ");
          while (name == "") {
            console.log("\nPlease enter the prodact's name....");
            name = readlineSync.question("Enter product name: ");
          }
          let description = readlineSync.question(
            "Enter product description: "
          );
          while (description == "") {
            console.log("\nPlease enter the prodact's description....");
            description = readlineSync.question("Enter product description: ");
          }
          const price = readlineSync.questionFloat("Enter product price: ");
          const stock = readlineSync.questionInt("Enter product stock: ");
          let category = readlineSync.question("Enter product category: ");
          while (category == "") {
            console.log("\nPlease enter the prodact's category....");
            category = readlineSync.question("Enter product category: ");
          }

          let barcode = readlineSync.question("Enter product barcode: ");
          while (barcode == "") {
            console.log("\nPlease enter the prodact's barcode....");
            barcode = readlineSync.question("Enter product barcode: ");
          }
          let status = readlineSync.question("Enter product status: ");
          while (status == "") {
            console.log("\nPlease enter the prodact's status....");
            status = readlineSync.question("Enter product status: ");
          }
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
          let id = readlineSync.questionInt("Enter product ID: ");

          let [rows] = await connection.execute(
            "SELECT * FROM products WHERE id = ?",
            [id]
          );
          while (rows.length == 0) {
            console.log("\nThe id you entered does not match any Product...");
            id = readlineSync.questionInt("Enter product ID: ");
            [rows] = await connection.execute(
              "SELECT * FROM products WHERE id = ?",
              [id]
            );
          }

          let newName = readlineSync.question("Enter the new product name: ");
          while (newName == "") {
            console.log("\nPlease enter the prodact's name....");
            newName = readlineSync.question("Enter the new product name: ");
          }
          let newDescription = readlineSync.question(
            "Enter the new product description: "
          );
          while (newDescription == "") {
            console.log("\nPlease enter the prodact's description....");
            newDescription = readlineSync.question(
              "Enter the new product description:  "
            );
          }
          const newPrice = readlineSync.questionFloat(
            "Enter the new product price: "
          );
          const newStock = readlineSync.questionInt(
            "Enter the new product stock: "
          );
          let newCategory = readlineSync.question(
            "Enter the new product category: "
          );
          while (newCategory == "") {
            console.log("\nPlease enter the prodact's category....");
            newCategory = readlineSync.question(
              "Enter the new product category: "
            );
          }
          let newBarcode = readlineSync.question(
            "Enter the new product barcode: "
          );
          while (newBarcode == "") {
            console.log("\nPlease enter the prodact's barcode....");
            newBarcode = readlineSync.question(
              "Enter the new product barcode: "
            );
          }
          let newStatus = readlineSync.question(
            "Enter the new product status: "
          );
          while (newStatus == "") {
            console.log("\nPlease enter the prodact's status....");
            newStatus = readlineSync.question("Enter the new product status: ");
          }
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
    const connection = await pool.getConnection();
    let choose = 0;
    while (choose !== 5) {
      console.log("\n  ==========Order Menu==========");
      console.log("  1. Retrieve a purchase order with these details. ");
      console.log("  2. Add a purcharse order");
      console.log("  3. Update purcharse order information");
      console.log("  4. Delete a purcharse order");
      console.log("  5. Exit the order menu");
      choose = readlineSync.questionInt("Choose an option: ");

      switch (choose) {
        case 1:
          const ids = readlineSync.questionInt("Enter id order: ");
          await getOrder(ids);
          break;
        case 2:
          let date = readlineSync.question("Enter order date (YYY-MM-DD): ");
          while (date == "") {
            console.log("\nPlease enter the order date....");
            date = readlineSync.question("Enter order date (YYY-MM-DD): ");
          }
          let deliveryAddress = readlineSync.question(
            "Enter oder delivery address: "
          );
          while (deliveryAddress == "") {
            console.log("\nPlease enter the order address....");
            deliveryAddress = readlineSync.question(
              "Enter oder delivery address: "
            );
          }
          let customerId = readlineSync.questionInt(
            "Enter customer customer id: "
          );

          let [rows] = await connection.execute(
            "SELECT * FROM customers WHERE id = ?",
            [customerId]
          );
          while (rows.length == 0) {
            console.log("\nThe id you entered does not match any Customer...");
            customerId = readlineSync.questionInt("Enter  customer id: ");
            [rows] = await connection.execute(
              "SELECT * FROM customers WHERE id = ?",
              [customerId]
            );
          }

          let tackNumer = readlineSync.question("Enter order TRACK Number: ");
          while (tackNumer == "") {
            console.log("\nPlease enter the order TRACK Number....");
            tackNumer = readlineSync.question("Enter order TRACK Number: ");
          }
          let status = readlineSync.question("Enter order status: ");
          while (status == "") {
            console.log("\nPlease enter the order status....");
            status = readlineSync.question("Enter order status: ");
          }
          await addOrder(date, deliveryAddress, customerId, tackNumer, status);
          break;
        case 3:
          let id = readlineSync.questionInt("Enter order id: ");
          let [rowss] = await connection.execute(
            "SELECT * FROM purcharses_orders WHERE id = ?",
            [id]
          );
          while (rowss.length == 0) {
            console.log("\nThe id you entered does not match any Order...");
            id = readlineSync.questionInt("Enter Order ID: ");
            [rowss] = await connection.execute(
              "SELECT * FROM purcharses_orders WHERE id = ?",
              [id]
            );
          }
          let newDate = readlineSync.question("Enter order date (YYY-MM-DD): ");
          while (newDate == "") {
            console.log("\nPlease enter the order date....");
            newDate = readlineSync.question("Enter order date (YYY-MM-DD): ");
          }
          let newDeliveryAddress = readlineSync.question(
            "Enter oder delivery address: "
          );
          while (newDeliveryAddress == "") {
            console.log("\nPlease enter the order address....");
            newDeliveryAddress = readlineSync.question(
              "Enter oder delivery address: "
            );
          }
          let newCustomerId = readlineSync.questionInt("Enter  customer id: ");

          let [rowsCustomer] = await connection.execute(
            "SELECT * FROM customers WHERE id = ?",
            [newCustomerId]
          );
          while (rowsCustomer.length == 0) {
            console.log("\nThe id you entered does not match any Customer...");
            newCustomerId = readlineSync.questionInt("Enter  customer id: ");
            [rowsCustomer] = await connection.execute(
              "SELECT * FROM customers WHERE id = ?",
              [newCustomerId]
            );
          }

          let newTackNumer = readlineSync.question(
            "Enter order TRACK Number: "
          );
          while (newTackNumer == "") {
            console.log("\nPlease enter the order TRACK Number....");
            newTackNumer = readlineSync.question("Enter order TRACK Number: ");
          }
          const newStatus = readlineSync.question("Enter order status: ");
          while (newStatus == "") {
            console.log("\nPlease enter the order status....");
            newStatus = readlineSync.question("Enter order status: ");
          }
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
    const connection = await pool.getConnection();
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
          let date = readlineSync.question("Enter payment date (YYY-MM-DD): ");
          while (date == "") {
            console.log("\nPlease enter the payment date....");
            date = readlineSync.question("Enter payment date (YYY-MM-DD): ");
          }
          const amount = readlineSync.questionFloat("Enter payment amount: ");
          const paymentMethod = readlineSync.question(
            "Enter payment payment method: "
          );
          let orderId = readlineSync.questionInt("Enter order id: ");
          let [rowsOrderId] = await connection.execute(
            "SELECT * FROM purcharses_orders WHERE id = ?",
            [orderId]
          );
          while (rowsOrderId.length == 0) {
            console.log("\nThe id you entered does not match any Order...");
            orderId = readlineSync.questionInt("Enter Order ID: ");
            [rowsOrderId] = await connection.execute(
              "SELECT * FROM purcharses_orders WHERE id = ?",
              [orderId]
            );
          }

          await addPayment(date, amount, paymentMethod, orderId);
          break;
        case 3:
          let id = readlineSync.questionInt("Enter payment id: ");

          let [rows] = await connection.execute(
            "SELECT * FROM payments WHERE id = ?",
            [id]
          );
          while (rows.length == 0) {
            console.log("\nThe id you entered does not match any Payment...");
            id = readlineSync.questionInt("Enter Payment ID: ");
            [rows] = await connection.execute(
              "SELECT * FROM payments WHERE id = ?",
              [id]
            );
          }

          const newdate = readlineSync.question(
            "Enter payment new date (YYY-MM-DD): "
          );
          const newamount = readlineSync.questionFloat(
            "Enter payment new amount: "
          );
          let newpaymentMethod = readlineSync.question(
            "Enter payment  method: "
          );
          while (newpaymentMethod == "") {
            console.log("\nPlease enter the payment method....");
            newpaymentMethod = readlineSync.question("Enter payment method: ");
          }
          let newOrderId = readlineSync.questionInt("Enter order id: ");

          let [NewRowsOrderId] = await connection.execute(
            "SELECT * FROM purcharses_orders WHERE id = ?",
            [newOrderId]
          );
          while (NewRowsOrderId.length == 0) {
            console.log("\nThe id you entered does not match any Order...");
            newOrderId = readlineSync.questionInt("Enter Order ID: ");
            [NewRowsOrderId] = await connection.execute(
              "SELECT * FROM purcharses_orders WHERE id = ?",
              [newOrderId]
            );
          }

          await editPayment(
            id,
            newdate,
            newamount,
            newpaymentMethod,
            newOrderId
          );
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

module.exports = { customer, product, purcharseOrder, payment };
