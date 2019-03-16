const fs = require('fs');
const zlib = require('zlib');

// ***************************************
// Setting encoding
var buffer8 = Buffer.from('Hello');
var buffer16 = Buffer.from('Hello', 'utf16le');

console.log(buffer8);
console.log(buffer16);

// common methods
console.log(buffer8.toString());
console.log(buffer8.toJSON());
buffer8.write('J');
console.log(buffer8.toString());

// ***************************************
// module objects
console.log(__dirname);
    // /Users/gregorymaj/projects/node-basics
console.log(__filename);
    // /Users/gregorymaj/projects/node-basics/app.js

// reading a file synchronously
const test = fs.readFileSync(__dirname + '/test.txt');

console.log(test.toString());

// reading a file asynchronously
fs.readFile(__dirname + '/test.txt', (err, data) => {
    console.log(data.toString());
})

// ***************************************
// using a readable stream
const readStream = fs.createReadStream(__dirname + '/long.txt', {
    encoding: 'utf8',
    highWaterMark: 2 * 1024
});

// using a writable stream
const writeStream = fs.createWriteStream(__dirname + '/other.txt', {
    encoding: 'utf8',
    highWaterMark: 2 * 1024 // Stream size = 2 KB
});

// callback execution when buffer is filled
readStream.on('data', (chunk) => {
    writeStream.write(chunk);
    writeStream.write('***************************************');
})

// using pipe for the above
const writer = fs.createWriteStream(__dirname + '/pipeTo.txt');

readStream.pipe(writer);

// gzip a file
const writeCompressed = fs.createWriteStream(__dirname + '/compress.txt.gz')

const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeCompressed);

