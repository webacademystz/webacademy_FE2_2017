var User = require( 'mongoose' ).model( 'User' ),
    encryption = require( '../common/encryption' );

module.exports = {
    getLogin: function( req, res ) {
        res.render( 'account/login' );
    },
    postLogin: function( req, res ) {
        var userToLogin = req.body;
        User
            .findOne( { username: userToLogin.username } )
            .then( function( user ) {
                if( !user || !user.authenticate( userToLogin.password ) ) {
                    req.session.errorMsg = 'Invalid username or password!';
                    res.redirect( '/login' );
                }
                req.login( user, function( err ) {
                    if( err ) {
                        req.session.errorMsg = 'Something is gone really bad! User can not be logged in! ***' + err.message + '***';
                        res.redirect( '/login' );
                    }
                    res.redirect( '/' );
                } );
            } );
    },
    getRegister: function( req, res ) {
        res.render( 'account/register' );
    },
    postRegister: function( req, res ) {
        var userToRegister = req.body;
        if( !userToRegister ) {
            req.session.errorMsg = 'Can not register empty user!';
            req.session.invalidUserData = userToRegister;
            res.redirect( '/register' );
        } else if( userToRegister.password !== userToRegister.confirmPassword ) {
            req.session.errorMsg = 'Passwords do not match!';
            req.session.invalidUserData = userToRegister;
            res.redirect( '/register' );
        } else {
            var salt = encryption.generateSalt(),
                pass = encryption.generatePassword( salt, userToRegister.password );
            User.create( {
                username: userToRegister.username,
                email: userToRegister.email,
                salt: salt,
                password: pass
            }, function( err, user ) {
                if( err ) {
                    req.session.errorMsg = err.message;
                    res.redirect( '/register' );
                } else {
                    req.login( user, function( err ) {
                        if( err ) {
                            req.session.errorMsg = 'Something is gone really bad! User can not be logged in! ***' + err.message + '***';
                            res.redirect( '/login' );
                        } else {
                            res.redirect( '/' );
                        }
                    } );
                }
            } );
        }
    },
    logout: function( req, res ) {
        req.logout();
        res.redirect( '/login' );
    },
    getProfile: function( req, res ) {
        res.render( 'account/profile', req.user );
    },
    updateProfile: function( req, res ) {
        var userToUpdate = req.body;
        if( !req.user.authenticate( req.body.oldPassword ) ) {
            req.session.errorMsg = 'Invalid password!';
            res.redirect( '/profile' );
        }
        else if( userToUpdate.password !== userToUpdate.confirmPassword ) {
            req.session.errorMsg = 'Passwords do not match';
            res.redirect( '/profile' );
        }
        else if(
            !userToUpdate.username ||
            !userToUpdate.email ||
            !userToUpdate.password ||
            !userToUpdate.confirmPassword
        ) {
            req.session.errorMsg = 'All fields are required!';
            res.redirect( '/profile' );
        }
        else {
            User.findByIdAndUpdate( req.user._id, {
                username: userToUpdate.username,
                email: userToUpdate.email,
                password: encryption.generatePassword( req.user.salt, userToUpdate.password )
            }, function( err, user ) {
                if( err ) {
                    req.session.errorMsg = 'User data can not be updated!'
                } else {
                    req.login( user, function( err ) {
                        if( err ) {
                            req.session.errorMsg = 'Something is gone really bad! User can not be logged in! ***' + err.message + '***';
                            res.redirect( '/login' );
                        } else {
                            res.redirect( '/profile' );
                        }
                    } );
                }
            } );
        }
    }
};