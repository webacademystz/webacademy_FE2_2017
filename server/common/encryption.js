var bcrypt = require( 'bcrypt' );

module.exports = {
    generateSalt: function() {
        return bcrypt.genSaltSync( 10 );
    },
    generatePassword: function( salt, password ) {
        // console.log( 'pass: ' + bcrypt.hashSync( password, salt ) ); //TODO
        return bcrypt.hashSync( password, salt );
    }
};

// var crypto = require( 'crypto' );
//
// module.exports = {
//     generateSalt: function() {
//         return crypto.randomBytes( 128 ).toString( 'base64' );
//     },
//     generatePassword: function( salt, password ) {
//         // console.log( 'salt: '+ salt + ' password: ' + password );
//         return crypto.createHmac( 'sha265', salt ).update( password ).digest( 'hex' )
//     }
// };