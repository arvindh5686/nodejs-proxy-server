"use strict"; 

let http = require('http'),
	request = require('request'),
	argv = require('yargs').argv;

let host = argv.host ? argv.host : '127.0.0.1',
	protocol = 'http://',
	port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80),
	destinationUrl = protocol + host + ':' + port;

let server = http.createServer((req, res) => {
	for (let header in req.headers) {
	    res.setHeader(header, req.headers[header])
	}
    req.pipe(res);
}).listen(8000);

http.createServer((req, res) => {
  let options = {
  	headers: req.headers,
    url: `${destinationUrl}${req.url}`
  }

  options.method = req.method;

  req.pipe(request(options)).pipe(res);
}).listen(8001)