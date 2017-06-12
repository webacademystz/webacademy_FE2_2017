var express = require( 'express' ),
    env = process.env.NODE_ENV || 'development',
    config = require( './server/config/appconfig' )[ env ],
    app = express();

require( './server/config/database' )( config );
require( './server/config/express' )( app, config );
require( './server/config/routes' )( app );
require( './server/config/passport' )();

app.listen( config.port );
console.log( 'Server is running on port: ' + config.port );