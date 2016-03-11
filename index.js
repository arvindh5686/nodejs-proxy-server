"use strict"; 

let http = require('http'),
	request = require('request'),
	argv = require('yargs')
	.usage('Usage: node index.js [options]')
    .example('node index.js --exec="cat index.js | grep require" --host=google.com --logFile=log.txt')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2016')
    .argv,

	fs = require('fs'),
	child_process = require('child_process'),
	Logger = require('./utils/logger');


let host = argv.host || '127.0.0.1',
	protocol = 'http://',
	port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80),
	destinationUrl = protocol + host + ':' + port,
	logStream = argv.logFile ? fs.createWriteStream(argv.logFile) : process.stdout,
	execCommand = argv.exec || 'ls',
	logLevel = argv.logLevel || 2;

let logger = new Logger(logLevel, logStream);

let server = http.createServer((req, res) => {
	for (let header in req.headers) {
	    res.setHeader(header, req.headers[header])
	}
    req.pipe(res);
}).listen(8000);

http.createServer((req, res) => {
	logger.log(5, JSON.stringify(req.headers));
	logger.log(5, req);

	destinationUrl = req.headers['x-destination-url'] || destinationUrl

  	let options = {
  		headers: req.headers,
    	url: `${destinationUrl}${req.url}`,
    	method: req.method
  	}

  	let downstreamResponse = req.pipe(request(options));
	logger.log(5, JSON.stringify(downstreamResponse.headers));
	logger.log(5, downstreamResponse);
	//downstreamResponse.pipe(logStream)
	downstreamResponse.pipe(res)
}).listen(8001);

var childProcess = child_process.exec(execCommand);

childProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

childProcess.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

childProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});