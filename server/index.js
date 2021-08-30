const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'dont cry for me argentinaaaaa!',
  'it was a run-by fruiting! ',
  'youre not gonna believe this, but its a one-wheeled haystack!',
  'one does not simply walk into mordor',
  'here we go, one more time, everybodys feeling fine!'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function (req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, { ...headers, Location: `http://localhost:${port}/quote` }) //redirect to quote
    res.end();
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    req.on('data', (data, error) => {
      if (error) {
        console.error(error)
        res.end(error)
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    })
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {

    var data = '';
    res.on('data', (chunkOfData) => {
      data += chunkOfData.toString();
    })
    res.on('end', () => {
      var quote = JSON.parse(data);
      quotes.push(quote);
      res.writeHead(201, {'Content-Type' : 'application.json'})
      res.end(JSON.stringify(quotes));
    });
    res.end();
  }

  //CATCH ALL ROUTE
  else {
    res.writeHead(404, headers);
    res.end('Page not found');
  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
