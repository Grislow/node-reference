const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html'});  
    fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);

}).listen(9000, () => console.log('Connected on port 9000'));

http.createServer((req, res) => {
    
    if(req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html'});  
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    } else if(req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application /json'});     
        let json = {
            firstName: 'John',
            lastName: 'Smith'
        }
        res.end(JSON.stringify(json));
    } else {
        res.writeHead(404);
        res.end();
    }

}).listen(9001, '127.0.0.1', () => console.log('Connected on port 9001'));