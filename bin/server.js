'use strict'

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodeapr:server');


const port = normalizePort(process.env.PORT || '3333');
app.set('port', port);

const server = http.createServer(app);

//indicar para o servidor ouvir nessa porta.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('Servidor rodando na porta ' + port);

//função para normalização da porta
    //recebo um valor
function normalizePort(val) {
    //convertendo o valor para um inteiro
    var port = parseInt(val, 10);
  
    //se esse valor não for um numero eu retorno 10 ^
    if (isNaN(port)) {
      return val;
    }
    
    //se a porta for >=0 retorno a porta.
    if (port >= 0) {
      return port;
    }
  
    //ou então retorno nada
    return false;
  }
  
//função para tratamento de erro ex:(Portas iguais...)
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
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

// listener handler
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }