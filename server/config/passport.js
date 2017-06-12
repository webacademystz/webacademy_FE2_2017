var passport = require( 'passport' ),
    LocalPassport = require( 'passport-local' ),
    User = require( 'mongoose' ).model( 'User' );

module.exports = function() {
    passport.use( 'local', new LocalPassport( {
            usernameField: 'username',
            passwordField: 'password'
        },
        function( username, password, done ) {
            User
                .findOne( { username: username } )
                .then( function( user ) {
                    if( !user ) return done( null, false );
                    if( !user.authenticate( password ) ) return done( null, false );
                    return done( null, user );
                } );
            // User.findOne( { username: username }, function ( err, user ) {
            //     if ( err )  { return done( err ); }
            //     if ( !user ) { return done( null, false, { message: 'Invalid username or password' } ); }
            //     if ( !user.authenticate( password ) ) { return done( null, false, { message: 'Invalid username or password' } ); }
            //     return done( null, user );
            // } );
        }
    ) );

    passport.serializeUser( function( user, done ) {
        if( user ) {
            return done( null, user._id )
        } else {
            console.log( 'not user to be serialized' );
        }
    } );

    // passport.serializeUser( function( user, done ) {
    //     if ( user ) return done( null, user._id )
    // });

    passport.deserializeUser( function( id, done ) {
        User.findById( id )
            .then( function( user ) {
                if ( !user ) return done( null, false );
                return done( null, user )
            })
    } );

};

