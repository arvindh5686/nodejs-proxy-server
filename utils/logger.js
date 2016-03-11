'use strict'

let stream = require('stream');


let logger = function(logLevel, logStream) {
	this.logLevel = logLevel;
	this.logStream = logStream;
}

logger.prototype.severity = {
	0 : "Emergency",
	1 : "Alert",
	2 : "Critical",
	3 : "Error",
	4 : "Warning",
	5 : "Notice"
}

logger.prototype.log = function(level, msg) {
	if (level < this.logLevel) return;

	if (typeof msg === 'string') {
		this.logStream.write("\n\n" + this.severity[level] + ': ' + msg);
	} else if(msg instanceof stream.Stream) {
		this.logStream.write("\n\n");
		msg.pipe(this.logStream);
	}
}

module.exports = logger;