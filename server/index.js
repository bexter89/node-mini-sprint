const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios').default;
const db = require('./db/index');
const cors = require('cors');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../react-client/dist/'));


app.get('/quote', (req, res) => {
  db.getMaxRows((err, rowCount)=> {
    if (err) {
      res.status(400).send('error getting max rows from DB table! ', err)
    } else {
      var index = Math.floor(Math.random() * (rowCount - 1) + 1);
      db.getRandomQuote(index, (err, data)=> {
        if (err) {
          res.status(400).send('error getting quote from DB! ', err)
        } else {
          res.status(200).send(data)
        }
      });
    }
  })
})

 app.post('/quote', (req, res) => {
   db.addNewQuote(req.body.text, (err, data)=> {
     if (err) {
       res.send(400).send('error adding quote to DB! ', err);
     } else {
       console.log('data in server index', data)
       res.status(201).send(data)
     }
   })
 })

app.listen(port, () => {
  console.log('Server is running in the terminal!');
  console.log(`Listening on http://localhost:${port}`);
})

