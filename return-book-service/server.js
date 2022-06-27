
const express = require('express');
const http = require('http');

const Routes = require('./routes');

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }



  includeRoutes() {
    new Routes(this.app).routesConfig();
  }


  startTheServer() {
    this.includeRoutes();

    const port = process.env.NODE_SERVER_PORT;
    const host = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

module.exports = new Server();