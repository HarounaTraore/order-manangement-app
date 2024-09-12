const { pool } = require("../db/db.js");

async function getProduct() {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute("SELECT * FROM products");
    if (rows.length === 0) {
      console.log("You don't have any registered products.");
    } else {
      console.table(rows);
    }
  } catch (e) {
    throw e;
  } finally {
    if (connection) connection.release();
  }
}

async function addProduct(name, description, price, stock, category, barcode, status) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Check if barcode already exists
    const [barcodeRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM products WHERE barcode = ?",
      [barcode]
    );

    if (barcodeRows[0].count > 0) {
      console.log(
        "You cannot assign barcode number to two different products."
      );
    } else {
      await connection.execute(
        "INSERT INTO products (name, description, price, stock, category, barcode, status) values (?, ?, ?, ?, ?, ?, ?)",
        [name, description, price, stock, category, barcode, status]
      );
      console.log(`The product ${name} was added successfully.`);
    }
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      console.error("\nCannot delete the product: there are references in other tables.");
    } else {
      throw error;
    }
  } finally {
    if (connection) connection.release();
  }
}

async function editProduct(id, name, description, price, stock, category, barcode, status) {
  let connection;
  try {
    connection = await pool.getConnection();

    // Check if ID already exists
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM products WHERE id = ?",
      [id]
    );

    // Check if barcode already exists but belongs to another product
    const [barcodeRows] = await connection.execute(
      "SELECT COUNT(*) AS count FROM products WHERE barcode = ? AND id != ?",
      [barcode, id]
    );

    if (idExist[0].count == 0) {
      console.log("The id you are trying to modify does not exist.");
    } else if (barcodeRows[0].count > 0) {
      console.log(
        "You cannot assign an barcode to two different products."
      );
    } else {
      await connection.execute(
        "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
        [name, description, price, stock, category, barcode, status, id]
      );
      console.log("The modification is carried out successfully.");
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function deleteProduct(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [idExist] = await connection.execute(
      "SELECT COUNT(*) AS count FROM products WHERE id = ?",
      [id]
    );
    if (idExist[0].count > 0) {
      await connection.execute("DELETE FROM products WHERE id = ?", [id]);
      console.log(`Product with ID ${id} deleted successfully.`);
    } else {
      console.log("The ID you are trying to delete does not exist.");
    }
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      console.log(
        "\nCannot delete the product: there are references in other tables."
      );
    } else {
      throw error;
    }
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
};
