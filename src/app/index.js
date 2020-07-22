const express = require("express");

let _express = null;
let _config = null;

class server {
    constructor({ router, configApp }) {
        _config = configApp;
        _express = express().use(router);
    }
    start() {
        return _express.listen(_config.port, '0.0.0.0',() => {
            console.log("API RUNNING on PORT " + _config.port);
        });
    }
}

module.exports = server;
