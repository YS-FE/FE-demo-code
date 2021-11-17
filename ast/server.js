const http = require('http');


http.createServer((req, res) => {

  console.log('url = ', req.url);


    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        console.log(data);
    });

    res.end('receive done ~');
}).listen(8899, () => {
  console.log('listening 8899');
});