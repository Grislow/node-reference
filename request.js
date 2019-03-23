const express = require('express');
const app = express();
const request = express();

app.use('/request', request);

request.all('/:param1/:param2', (req, res) => {
    console.log(req.app.get('etag'));               // weak
    console.log(req.baseUrl);                       // /request
    console.log(req.fresh);                         // false
    console.log(req.hostname);                      // localhost
    console.log(req.ip);                            // ::1
    console.log(req.ips);                           // []
    console.log(req.method);                        // GET
    console.log(req.originalUrl);                   // /request/aaa/1234?t=12345
    console.log(req.params);                        // { param1: 'aaa', param2: '1234' }
    console.log(req.path);                          // /aaa/1234
    console.log(req.protocol);                      // http
    console.log(req.query);                         // { t: '12345' }
    console.log(req.secure);                        // false
    console.log(req.stale);                         // true
    console.log(req.subdomains);                    // []
    console.log(req.xhr);                           // false
    res.end();
})

request.all('/methods', (req, res) => {
    /* 
        accepts()
    */
    // Accept HTTP Header
    console.log(req.get('Accept'));
        // text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    
    // extensions
    console.log(req.accepts('html'));               // html
    
    // mime type
    console.log(req.accepts('application/json'));   // application/json
    
    // array
    console.log(req.accepts(['text', 'json', 'xml']));
                                                    // xml
})

app.listen(3000);