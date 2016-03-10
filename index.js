"use strict"; 

let http = require('http'),
	request = require('request'),
	argv = require('yargs').argv,
	fs = require('fs');


let host = argv.host || '127.0.0.1',
	protocol = 'http://',
	port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80),
	destinationUrl = protocol + host + ':' + port,
	logStream = argv.logFile ? fs.createWriteStream(argv.logFile) : process.stdout;

let server = http.createServer((req, res) => {
	for (let header in req.headers) {
	    res.setHeader(header, req.headers[header])
	}
    req.pipe(res);
}).listen(8000);

http.createServer((req, res) => {
	logStream.write('\n\n\n' + JSON.stringify(req.headers))
	req.pipe(logStream)

	destinationUrl = req.headers['x-destination-url'] || destinationUrl

  	let options = {
  		headers: req.headers,
    	url: `${destinationUrl}${req.url}`,
    	method: req.method
  	}

  	let downstreamResponse = req.pipe(request(options))
	logStream.write(JSON.stringify(downstreamResponse.headers))
	downstreamResponse.pipe(logStream)
	downstreamResponse.pipe(res)
}).listen(8001)