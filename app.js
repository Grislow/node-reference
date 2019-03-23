const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const urlencodedparser = bodyParser.urlencoded({ extended: false });

const port = process.env.PORT || 3000;

// LOCALS
app.locals.log = (()=> {
    let count = 0;
    return () => ++count;
})();

// MOUNTPATH
const subApp = express();

subApp.get('/', (req, res) => {
    console.log(subApp.mountpath);  
})

app.use(['/example', '/otherroute'], subApp);

console.log(app.path());
console.log(subApp.path());

// SETTINGS
console.log(app.get(`case sensitive routing`)); 

// MIDDLEWARES
app.use((req, res, next) => {
    console.log('Executes first');
    next();
})

app.use((req, res, next) => {
    console.log('Executes second');
    next();
})

app.use('/assets', express.static(__dirname + '/public'));

app.use(function timeLog (req, res, next) {
  console.log('Time: ', (new Date()).toLocaleString());
  next();
});

// REQUEST PROPERTIES
const request = express();

app.use('/request', request);

request.all('/props/:param1/:param2', (req, res) => {
    console.log(req.app.get('etag'));           // weak
    console.log(req.baseUrl);                   // /request
    console.log(req.fresh);                     // false
    console.log(req.hostname);                  // localhost
    console.log(req.ip);                        // ::1
    console.log(req.ips);                       // []
    console.log(req.method);
    console.log(req.originalUrl);
    console.log(req.params);
    console.log(req.path);
    console.log(req.protocol);
    console.log(req.query);
    console.log(req.route);
    console.log(req.secure);                    // false
    console.log(req.stale);                     // true
    console.log(req.subdomains);                // []
    console.log(req.xhr);                       // false
    res.end();
})

// PARAM
app.param('user', (req, res, next, val, name) => {
    console.log(`value: ${val}`);
    console.log(`name: ${name}`);
    next();
})

app.param(['user', 'post'], (req, res, next, val, name) => {
    console.log(`value: ${val}; name: ${name}`);
    next();
})

// ROUTING
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <link 
                    href="assets/main.css"
                    type="text/css"
                    rel="stylesheet"
                />
            </head>
            <body>
                <h1>HELLO</h1>
                <h2>Count: ${req.app.locals.log()}</h2>
            </body>
        </html>
    `)
});

app.get('/api', (req, res) => {
    res.json({ firstName: 'John', lastName: 'Smith'});
});

app.get('/users/:user', (req, res) => {
    res.send(`
        <html>
            <head></head>
            <body>
                <h1>Hi! ${req.params.user}</h1>
            </body>
        </html>
    `)
});

app.get('/users/:user/:post', (req, res) => {
    res.send(`
        <html>
            <head></head>
            <body>
                <h1>${req.params.user}</h1>
                <p>${req.params.post}</p>
            </body>
        </html>
    `)
});

app.get('/howdy', (req, res) => {
    res.send('a string route path');
})

app.get('/a(bc)+', (req, res) => {
    res.send('a string pattern route path');
});


app.get(/cents$/, (req, res) => {
    res.send('a regular expression route path');
})

function one(req, res, next) {
    console.log('do something here');
    next();
}

function two(req, res, next) {
    console.log('do something else');
    next();
}

function three(req, res) {
    res.send('Sending the response');
}

// array
app.get('/test1', [one, two, three]);

// independent arguments
app.get('/test2', (req, res, next) => {
    console.log('Executing first handler');
    next();
}, (req, res) => {
    res.send('this is called last');
})

// combination
app.get('/test3', (req, res, next) => {
    console.log('Executing first handler');
    next();
}, (req, res, next) => {
    console.log('then this is called');
    next();
}, [one, two, three]);

app.use((req, res, next) => {
    console.log('this never executes');
    next();
})

// QueryString, Post Parameters
app.get('/params/:name/:postid', (req, res) => {
    console.log(`${req.params.name} requested post ${req.params.postid}`);
    res.end();
})

app.get('/querystring', (req, res) => {
    for(let prop in req.query){
        console.log(prop + ': ' + req.query[prop]);
            //> name: gregory
            //> id: 123456   
    }
    res.end();
})

app.post('/person', urlencodedparser, (req, res) => {
    res.end();
    console.log(req.body.name);
    console.log(req.body.email);
})

// VIEW ENGINE
app.set('views', './templates');
// set the view engine
app.set('view engine', 'ejs');

app.get('/engine', (req, res) => {
    res.render('file', { title: 'Best Page Ever', message: 'Greeting User' });
})

// ERROR HANDLING
app.get('/error', (req, res) => {
    throw new Error('FAILED');
})

app.get('/asyncerror', (req, res, next) => {
    setTimeout(() => {
        next(new Error('ASYNC FAIL'));
    }, 2000);
});

app.get('/promise', (req, res, next) => {
    Promise.resolve()
        .then(()=> {
            throw new Error('PROMISE FAIL');
        }).catch(next);
});

// LISTEN ON PORT
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});

app.listen(1227, '127.0.0.1');