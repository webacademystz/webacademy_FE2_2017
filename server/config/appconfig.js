var path = require( 'path' ),
    rootPath = path.normalize( path.join( __dirname, '../../' ) );

module.exports = {
    development: {
        rootPath: rootPath,
        connectionString: 'mongodb://localhost:27017/webacademy',
        secret: 'secret',
        port: 5555,
        masterAdminPass: 'parola'
    },
    production: {
        rootPath: rootPath,
        connectionString: process.env.connectionString,
        secret: process.env.secret,
        port: process.env.port,
        masterAdminPass: process.env.masterAdminPass
    }
};