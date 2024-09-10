const { pool } = require("../db/db.js");

async function getPayment() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Requête pour obtenir tous les paiements
    const [rows] = await connection.execute("SELECT * FROM payments");
    if (rows.length === 0) {
      throw new Error("You don't have any registered payments.");
    } else {
      console.table(rows);
    }
  } catch (e) {
    throw e;
  } finally {
    if (connection) connection.release();
  }
}

async function addPayment(date, amount, payment_method, order_id) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Vérifier si l'ID de la commande existe
    const [idOrder] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE id = ?",
      [order_id]
    );

    if (idOrder[0].count == 0) {
      throw new Error(
        "You cannot assign a payment to an order that does not exist."
      );
    } else {
      await connection.execute(
        "INSERT INTO payments (date, amount, payment_method, order_id) VALUES (?, ?, ?, ?)",
        [date, amount, payment_method, order_id]
      );
      console.log("The payment was added successfully.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function editPayment(id, date, amount, payment_method, order_id) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Vérifier si l'ID du paiement existe
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM payments WHERE id = ?",
      [id]
    );

    // Vérifier si l'ID de la commande existe
    const [idOrder] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE id = ?",
      [order_id]
    );

    if (idExist[0].count == 0) {
      throw new Error("The payment ID you are trying to modify does not exist.");
    } else if (idOrder[0].count == 0) {
      throw new Error("You cannot associate a payment with a non-existent order.");
    } else {
      await connection.execute(
        "UPDATE payments SET date = ?, amount = ?, payment_method = ?, order_id = ? WHERE id = ?",
        [date, amount, payment_method, order_id, id]
      );
      console.log("The modification was carried out successfully.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function deletePayment(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM payments WHERE id = ?",
      [id]
    );
    if (idExist[0].count > 0) {
      await connection.execute("DELETE FROM payments WHERE id = ?", [id]);
      console.log(`Payment with ID ${id} deleted successfully.`);
    } else {
      throw new Error("The payment ID you are trying to delete does not exist.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addPayment,
  getPayment,
  editPayment,
  deletePayment,
};
