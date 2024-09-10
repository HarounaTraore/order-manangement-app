const { pool } = require("../db/db.js");

async function getCustomer() {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute("SELECT * FROM customers");
    if (rows.length === 0) {
      throw new Error("You don't have any registered customers.");
    } else {
      console.table(rows);
    }
  } catch (e) {
    console.log(e.message);
  } finally {
    if (connection) connection.release();
  }
}

async function addCustomer(name, address, email, phone) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Check if email or phone already exists
    const [emailRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE email = ?",
      [email]
    );

    const [phoneRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE phone = ?",
      [phone]
    );

    if (emailRows[0].count > 0 || phoneRows[0].count > 0) {
      throw new Error(
        "You cannot assign an email or phone number to two different customers."
      );
    } else {
      await connection.execute(
        "INSERT INTO customers (name, address, email, phone) values (?, ?, ?, ?)",
        [name, address, email, phone]
      );
      console.log(`The client ${name} was added successfully.`);
    }
  } catch (error) {
    throw error.message;
  } finally {
    if (connection) connection.release();
  }
}

async function editCustomer(id, name, address, email, phone) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Check if ID already exists
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE id = ?",
      [id]
    );

    // Check if email or phone already exists
    const [emailRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE email = ?",
      [email]
    );

    const [phoneRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE phone = ?",
      [phone]
    );

    if (idExist[0].count == 0) {
      throw new Error("The id you are trying to modify does not exist.");
    } else if (emailRows[0].count > 0 || phoneRows[0].count > 0) {
      throw new Error(
        "You cannot assign an email or phone number to two different customers."
      );
    } else {
      await connection.execute(
        "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
        [name, address, email, phone, id]
      );
      console.log("The modification is carried out successfully.");
    }
  } catch (error) {
    throw error.message;
  } finally {
    if (connection) connection.release();
  }
}

async function deleteCustomer(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE id = ?",
      [id]
    );
    if (idExist[0].count > 0) {
      await connection.execute("DELETE FROM customers WHERE id = ?", [id]);
      console.log(`Customer with ID ${id} deleted successfully.`);
    } else {
      throw new Error("The ID you are trying to delete does not exist.");
    }
  } catch (error) {
    throw error.message;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addCustomer,
  getCustomer,
  editCustomer,
  deleteCustomer,
};
