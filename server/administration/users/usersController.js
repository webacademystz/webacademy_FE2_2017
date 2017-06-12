var User = require( 'mongoose' ).model( 'User' );

module.exports = {
    getAllUsers: function( req, res) {
        User.find( {} )
            .where( 'username' ).ne( 'bro555555' )
            .then( function( users ) {
                res.render( 'administration/users/users', { users: users } );
            } );
    },
    changeUserRoles: function( req, res ) {
        var roles = req.body.roles ? [ 'user' ].concat( req.body.roles ) : [ 'user' ];
        User.findByIdAndUpdate( req.params.id, { roles: roles }, function( err, user ) {
            if( err ) {
                console.log( err );
                req.session.errorMsg = 'Error updating user roles: ' + err.message;
            }
            res.redirect( '/manage/users' );
        } )
    },
    changeBannStatus: function( req, res ) {
        User.findByIdAndUpdate( req.params.id, { isBanned: req.body.bannUser === 'banned' }, function( err, user ) {
            if( err ) {
                console.log( err );
                req.session.errorMsg = 'Error updating bann user status: ' + err.message;
            }
            res.redirect( '/manage/users' );
        } );
    },
    changeDeleteStatus: function( req, res ) {
        User.findByIdAndUpdate( req.params.id, { isDeleted: req.body.deleteUser === 'deleted' }, function( err, user ) {
            if( err ) {
                console.log( err );
                req.session.errorMsg = 'Error updating delete user status: ' + err.message;
            }
            res.redirect( '/manage/users' );
        } );
    }
};