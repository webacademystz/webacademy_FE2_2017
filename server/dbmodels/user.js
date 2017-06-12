var mongoose = require( 'mongoose' ),
    beautifyUnique = require( 'mongoose-beautiful-unique-validation' ),
    encryption = require( '../common/encryption' );
    require( 'mongoose-type-email' );

var userSchema = mongoose.Schema( {
    username: { type: String, required: 'username is required!', unique: 'This username already exists!' },
    email: { type: mongoose.SchemaTypes.Email, required: 'email is required!', unique: 'This email already exists!' },
    salt: { type: String },
    password: { type: String },
    roles: { type: [ String ], default: [ 'user' ] },
    isBanned: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
} );

userSchema.methods = {
    authenticate: function( password ) {
        return encryption.generatePassword( this.salt, password ) === this.password;
    }
};

userSchema.plugin(beautifyUnique);

var User = mongoose.model( 'User', userSchema );

module.exports = User;

module.exports.seedMasterAdmin = function( config ) {
    User.find({})
        .then( function( users ) {
            if( users.length === 0 ) {
                var salt = encryption.generateSalt(),
                    password = encryption.generatePassword( salt, config.masterAdminPass );
                User.create( {
                    username: 'bro555555',
                    email: 'george.hd.it@gmail.com',
                    salt: salt,
                    password: password,
                    roles: [ 'user', 'admin', 'master-admin' ],
                    isBanned: false,
                    isDeleted: false
                }, function( err, user ) {
                    if( err )console.log( 'Error creating master admin user: ' + err );
                } );
            }
        } );
};