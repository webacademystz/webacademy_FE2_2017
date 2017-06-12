module.exports = {
    isAuthnticated: function( req, res, next ) {
        if( req.isAuthenticated() && !req.user.isBanned && !req.user.isDeleted ) {
            next();
        } else {
            if( req.user && req.user.isBanned ) {
                req.session.globalErr = 'Your account is banned!';
            }
            if( req.user && req.user.isDeleted ) {
                req.session.globalErr = 'Account do not exists!';
            }
            res.redirect( '/login' );
        }
    },
    isInRole: function( role ) {
        return function( req, res, next ) {
            if( req.user && req.user.roles.indexOf( role ) > -1 ) {
                next();
            } else {
                req.session.globalErr = 'You have not permissions to do that!';
                res.redirect( '/login' );
            }
        }
    }
};