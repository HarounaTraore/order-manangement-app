const { pool, connection } = require("../db/db.js");
const readlineSync = require("readline-sync");

async function getOrder(id) {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rowsOrder] = await connection.execute(
      "SELECT * FROM purcharses_orders WHERE id = ?",
      [id]
    );
    const [rowsDetails] = await connection.execute(
      "SELECT * FROM orders_details WHERE order_id = ? ",
      [id]
    );
    if (rowsOrder.length === 0) {
      console.log("\nNo order recorded with the id " + id + ".\n");
    } else {
      console.table(rowsOrder);
      console.table(rowsDetails);
    }
  } catch (e) {
    throw e;
  } finally {
    if (connection) connection.release();
  }
}

async function addOrder(
  date,
  delivery_address,
  customer_id,
  track_number,
  status
) {
  let connection;
  try {
    connection = await pool.getConnection();

    const [trackRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE track_number = ?",
      [track_number]
    );
    const [idCustomer] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE id = ?",
      [customer_id]
    );

    if (trackRows[0].count > 0) {
      console.log(
        "\nYou cannot assign the same track number to two different orders.\n"
      );
    } else if (idCustomer[0].count == 0) {
      console.log(
        "\nYou cannot associate an order with a customer that does not exist\n"
      );
    } else {
      // added details orders
      const details = [];
      let choose = 0;
      while (choose !== 32 && choose !== 33) {
        console.log("\n   31 Add product");
        console.log("   32 Save order");
        console.log("   33 Discard ");
        choose = readlineSync.questionInt("Choose an option: ");
        switch (choose) {
          case 31:
            let productId = readlineSync.questionInt("Enter the product id: ");
            let [rows] = await connection.execute(
              "SELECT * FROM products WHERE id = ?",
              [productId]
            );
            while (rows.length == 0) {
              console.log("\nThe id you entered does not match any product...");
              productId = readlineSync.questionInt("Enter the product id: ");
              [rows] = await connection.execute(
                "SELECT * FROM products WHERE id = ?",
                [productId]
              );
            }
            const quantity = readlineSync.questionInt(
              "Enter the product quantity: "
            );
            const price = readlineSync.questionFloat("Enter the product price: ");
            const detail = {
              productId,
              quantity,
              price,
            };
            details.push(detail);
            break;
          case 32:
            const [orderId] = await connection.execute(
              "INSERT INTO purcharses_orders (date, delivery_address, customer_id, track_number, status) values (?, ?, ?, ?, ?)",
              [date, delivery_address, customer_id, track_number, status]
            );
            console.log(
              `The order was added successfully with id ${orderId.insertId}.`
            );

            if (details.length > 0) {
              const purcharseOrderId = orderId.insertId;
              for (i in details) {
                await connection.execute(
                  "INSERT INTO orders_details (quantity, price, product_id, order_id) VALUES (?, ?, ?, ? )",
                  [
                    details[i].quantity,
                    details[i].price,
                    details[i].productId,
                    purcharseOrderId,
                  ]
                );
              }
            }
            break;
          case 33:
            console.log("The entered data was not saved.");
            break;
          default:
            console.log("You did not choose a valid option...");
            break;
        }
      }
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function editOrder(
  id,
  date,
  delivery_address,
  customer_id,
  track_number,
  status
) {
  let connection;
  try {
    connection = await pool.getConnection();

    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE id = ?",
      [id]
    );

    const [trackRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE track_number = ? AND id != ?",
      [track_number, id]
    );

    if (idExist[0].count == 0) {
      console.log("The id you are trying to modify does not exist.");
    } else if (trackRows[0].count > 0) {
      console.log(
        "You cannot assign the same track number to two different orders."
      );
    } else {
      await connection.execute(
        "UPDATE purcharses_orders SET date = ?, delivery_address = ?, customer_id = ?, track_number = ?, status = ? WHERE id = ?",
        [date, delivery_address, customer_id, track_number, status, id]
      );
      console.log("The modification is carried out successfully.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function deleteOrder(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE id = ?",
      [id]
    );
    if (idExist[0].count > 0) {
      await connection.execute("DELETE FROM purcharses_orders WHERE id = ?", [
        id,
      ]);
      console.log(`Order with ID ${id} deleted successfully.`);
    } else {
      console.log("The ID you are trying to delete does not exist.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function addDetail() {
  try {
    const productIds = [];
    console.log("\n    ==========Order Submenu==========");
    console.log("    31 Add product id");
    console.log("    32 Save order");
    console.log("    33 Discard ");
    const choose = readlineSync.questionInt("Choisir une option: ");
    switch (choose) {
      case 31:
        const productId = readlineSync.questionInt("Enter the product id: ");
        productIds.push(productId);
        break;
      case 32:
        connection = await pool.getConnection();

        if (productIds.length > 0) {
          const purcharseOrderId = orderId.insertId;
          for (i in productId) {
            await connection.execute("INSERT INTO orders_details (");
          }
        }
    }
  } catch (e) {
    throw e.message;
  }
}

module.exports = {
  addOrder,
  getOrder,
  editOrder,
  deleteOrder,
};
