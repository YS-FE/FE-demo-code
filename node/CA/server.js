const https = require('https');
const fs = require('fs');

let options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('helloworld\n');
}).listen(8000);

