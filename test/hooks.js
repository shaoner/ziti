var config = require('./config');
var ziti = require('../index');

module.exports = {
    sync: function () {
        ziti.configure(config);
        return ziti.sync({
            dropTable: true,
            createTable: true
        });
    },
    clean: function () {
        return ziti.end();
    }
};
