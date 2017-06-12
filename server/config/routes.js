var auth = require( './auth' );

module.exports = function( app ) {
    app.get( '/', auth.isAuthnticated, require( '../home/homeController' ).getHome );
    app.get( '/login', require( '../account/userController' ).getLogin );
    app.post( '/login', require( '../account/userController' ).postLogin );
    app.get( '/register', require( '../account/userController' ).getRegister );
    app.post( '/register', require( '../account/userController' ).postRegister );
    app.post( '/logout', auth.isAuthnticated, require( '../account/userController' ).logout );
    app.get( '/profile', auth.isAuthnticated, require( '../account/userController' ).getProfile );
    app.post( '/profile', auth.isAuthnticated, require( '../account/userController' ).updateProfile );

    //*****MANAGE*****//

    //***user***//
    app.get( '/manage', auth.isInRole( 'admin' ), require( '../administration/dashboard/homeController' ).getHome );
    app.get( '/manage/users', auth.isInRole( 'admin' ), require( '../administration/users/usersController' ).getAllUsers );
    app.post( '/manage/change-user-roles/:id', auth.isInRole( 'master-admin' ), require( '../administration/users/usersController' ).changeUserRoles );
    app.post( '/manage/is-banned/:id', auth.isInRole( 'admin' ), require( '../administration/users/usersController' ).changeBannStatus );
    app.post( '/manage/is-deleted/:id', auth.isInRole( 'admin' ), require( '../administration/users/usersController' ).changeDeleteStatus );

    //***section***//
    app.get( '/manage/sections', auth.isInRole( 'admin' ), require( '../administration/sections/sectionsController' ).getAllSections );
    app.get( '/manage/create-section', auth.isInRole( 'admin' ), require( '../administration/sections/sectionsController' ).createSection );
    app.post( '/manage/create-section/:id', auth.isInRole( 'admin' ), require( '../administration/sections/sectionsController' ).insertSection );
    app.post( '/manage/edit-section/:id', auth.isInRole( 'admin' ), require( '../administration/sections/sectionsController' ).editSection );
    app.post( '/manage/update-section/:id', auth.isInRole( 'admin' ), require( '../administration/sections/sectionsController' ).updateSection );
    app.post( '/manage/delete-section/:id', auth.isInRole( 'admin' ), require( '../administration/sections/sectionsController' ).deleteSection );
};