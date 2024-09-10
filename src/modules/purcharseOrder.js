const { pool } = require("../db/db.js");

async function getOrder() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Requête pour obtenir toutes les commandes
    const [rows] = await connection.execute("SELECT * FROM purcharses_orders");
    if (rows.length === 0) {
      throw new Error("You don't have any registered orders.");
    } else {
      console.table(rows);
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

    // Vérifier si le numéro de suivi (track_number) existe déjà
    const [trackRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE track_number = ?",
      [track_number]
    );
    const [idCustomer] = await connection.execute(
        "SELECT COUNT(*) AS count FROM customers WHERE id = ?",
        [customer_id]
      );

    if (trackRows[0].count > 0 ) {
      throw new Error(
        "You cannot assign the same track number to two different orders."
      );
    }else if(idCustomer[0].count == 0){
        throw new Error("You cannot associate an order with a customer that does not exist")
    }
     else {
      await connection.execute(
        "INSERT INTO purcharses_orders (date, delivery_address, customer_id, track_number, status) values (?, ?, ?, ?, ?)",
        [date, delivery_address, customer_id, track_number, status]
      );
      console.log(`The order was added successfully.`);
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

    // Vérifier si l'ID existe
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE id = ?",
      [id]
    );

    // Vérifier si le numéro de suivi existe déjà mais pour une autre commande
    const [trackRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purcharses_orders WHERE track_number = ? AND id != ?",
      [track_number, id]
    );

    if (idExist[0].count == 0) {
      throw new Error("The id you are trying to modify does not exist.");
    } else if (trackRows[0].count > 0) {
      throw new Error(
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
      throw new Error("The ID you are trying to delete does not exist.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addOrder,
  getOrder,
  editOrder,
  deleteOrder,
};
