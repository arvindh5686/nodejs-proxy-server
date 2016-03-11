# Proxy Server

This is a Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: [Write the number of hours you spend here]

Completed:

* [X] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [X] Required: Requests/reponses are proxied to/from the destination server
* [X] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [X] Required: The destination server is configurable via the `x-destination-url` header
* [X] Required: Client requests and respones are printed to stdout
* [X] Required: The `--logfile` argument outputs all logs to the file specified instead of stdout
* [X] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program
* [X] Optional: The `--loglevel` argument sets the logging chattiness
* [] Optional: Supports HTTPS
* [X] Optional: `-h` argument prints CLI API

Walkthrough Gif:
[Add walkthrough.gif to the project root]

![Video Walkthrough](walkthrough.gif)

Note: to embed the gif file, just check your gif file into your repo and update the name of the file above.

## Starting the Server

```bash
npm start
```

### Configuration:

#### CLI Arguments:

The following CLI arguments are supported:

##### `--host`

The host of the destination server. Defaults to `127.0.0.1`.

##### `--port`

The port of the destination server. Defaults to `80` or `8000` when a host is not specified.

##### `--logfile`

Specify a file path to redirect logging to.

#### Headers

The follow http header(s) are supported:

##### `x-destination-url`

Specify the destination url on a per request basis. Overrides and follows the same format as the `--url` argument.
