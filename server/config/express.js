var express = require( 'express' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser = require( 'body-parser' ),
    session = require( 'express-session' ),
    passport = require( 'passport' ),
    favicon = require( 'serve-favicon' ),
    path = require( 'path' ),
    fileUpload = require( 'express-fileupload' );

module.exports = function( app, config ) {
    app.set( 'view engine', 'pug' );
    app.set( 'views', config.rootPath + '/server' );

    app.use( cookieParser() ) ;
    app.use( bodyParser.urlencoded( { extended: true } ) );
    app.use( session( {
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        }
    } ) );
    app.use( passport.initialize() );
    app.use( passport.session() );
    app.use( fileUpload() );
    app.use( favicon( path.normalize( path.join( __dirname, '../../', 'public', 'images', 'favicon.ico' ) ) ) );

    app.use( function( req, res, next ) {
        if( req.session.errorMsg ) {
            var err = req.session.errorMsg;
            req.session.errorMsg = undefined;
            res.locals.errorMsg = err;
        } else {
            res.locals.errorMsg = undefined;
        }
        if( req.session.globalErr ) {
            var globalErr = req.session.globalErr;
            req.session.globalErr = undefined;
            res.locals.globalErr = globalErr;
        } else {
            res.locals.globalErr = undefined;
        }
        if( req.user && req.isAuthenticated() && !req.user.isBanned && !req.user.isDeleted ) {
            res.locals.currentUser = req.user.username;
            if( req.user.roles.indexOf( 'admin' ) > -1 || req.user.roles.indexOf( 'master-admin' ) > -1 ) {
                res.locals.isAdmin = true;
            }
        }
        next();
    } );

    app.use( express.static( config.rootPath + '/public' ) );
};