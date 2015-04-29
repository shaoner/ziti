var ziti = require('../../index');

var Photo = ziti.define('Photo', {
    path: ziti.String().unique(),
});

module.exports = Photo;
