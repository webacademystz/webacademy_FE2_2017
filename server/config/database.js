var mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

module.exports = function( config ) {
    mongoose.connect( config.connectionString );

    var db = mongoose.connection;

    db.once( 'open', function( err ) {
        if( err ) console.log( err );
        console.log( 'Database is running...' );
    } );

    db.on( 'error', function( err ) {
        console.log( err );
    } );

    require( '../dbmodels/user' ).seedMasterAdmin( config );
};
