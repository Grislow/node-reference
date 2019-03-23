const express = require('express');
const app = express();

app.use('/', (req, res) => {
    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
    console.log(res.get('Set-Cookie'));

    res.attachment('files/logo.png');
    console.log(res.get('Content-Disposition'));
    console.log(res.get('Content-Type'));

    res.cookie('user','1001234');
    console.log(res.get('Set-Cookie'));

    
    res.links({
        next: 'http://example.com/products?page=3',
        last: 'http://example.com/products?page=10'
    });
    console.log(res.get('Link'));

    res.location('https://example.io');
    console.log(res.get('Location'));

    res.set('Content-Type', 'text/html');
    console.log(res.get('Content-Type'));

    res.type('png');
    console.log(res.get('Content-Type'));

    res.vary('User-Agent');
    console.log(res.get('Vary'));

    res.format({
        'text/plain': function(){
            res.send('Hello');
        },
        'text/html': function(){
            res.send('<h1>Hello</h1>');
        },
        'application/json': function(){
            res.send({ message: 'Hello' });
        },
        'default': function(){
            res.status(403).end();
        }
    });
})

app.listen(3000);