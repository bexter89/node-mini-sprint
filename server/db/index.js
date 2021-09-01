var mysql = require('mysql')

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'quotes'
});

dbConnection.connect((err, success) => {
  if (err) {
    console.log('error trying to connect to the DB!')
  } else {
    console.log('connection to DB successful!')
  }
});

getMaxRows = (callback) => {
  dbConnection.query('SELECT COUNT(*) FROM random_quotes', (err, rowCount)=> {
    if (err) {
      console.log('there was an error fetching a quote from the database! ', err);
    } else {
      callback(null, rowCount[0]['COUNT(*)']);
    }
  })
}

getRandomQuote = (param, callback) => {
  var queryString = 'SELECT text FROM random_quotes WHERE id = ?';
  dbConnection.query(queryString, [param], (err, data)=>{
    if (err) {
      console.log('there was an error fetching a quote from the database! ', err);
    } else {
      callback(null, data);
    }
  })
}

addNewQuote = (quoteText, callback) => {
  console.log('***** QUOTE TEXT **** ', quoteText)
  var queryString = `INSERT INTO random_quotes (text) VALUES (?)`;
  dbConnection.query(queryString, [quoteText], (err, data)=>{
    if (err) {
      console.log('there was an error adding a new quote to the database! ', err);
    } else {
      callback(null, data);
    }
  })
}


module.exports.dbConnection = dbConnection;
module.exports.getRandomQuote = getRandomQuote;
module.exports.getMaxRows = getMaxRows;
module.exports.addNewQuote = addNewQuote;