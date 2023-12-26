const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TestDB123',
  database: 'GarmentDB',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;
