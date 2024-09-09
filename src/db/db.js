const mysql = require("mysql2");
const con =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harouna",
  database: "order_management",
});

const connection = () => {
   con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });
};
connection();
module.exports = {  con, connection };
