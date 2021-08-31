var mysql = require('mysql')

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'quotes'
});

dbConnection.connect((err, success => {
  if (err) {
    console.log('error trying to connect to the DB!')
  } else {
    console.log('connection to DB successful!')
  }
}));

module.exports.dbConnection = dbConnection;