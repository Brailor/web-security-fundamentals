#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./server/index.js');
var debug = require('debug')('strawbank:server');
var https = require('https');
var fs = require('fs');
var path = require('path');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
///////////////////////////////////////////
//// ↓ EXERCISE 9 SOLUTION GOES HERE ↓ ////
////  - Setup express to work over HTTPS //
////
////  let server = https.createServer({
////    cert: fs.readFileSync('filename'),
////    key: fs.readFileSync('filename'),
////    passphrase: 'key-passphrase'
////  }, app);

var options = {
  key: fs.readFileSync('./keys/my-private.key'),
  // key: path.join(__dirname, 'keys/my-private.key'),
  // cert: path.join(__dirname, 'keys/my-certificate.crt'),
  cert: fs.readFileSync('./keys/my-certificate.crt'),
  passphrase: process.env.PASSPHRASE //process.env.PASSPHRASE
};
console.log(options.cert);

var server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
