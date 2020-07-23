const express = require("express");

let _express = null;
let _config = null;

class server {
    constructor({ router, configApp }) {
        _config = configApp;
        _express = express().use(router);
    }
    start() {
        return _express.listen(8080);
    }
}

module.exports = server;
