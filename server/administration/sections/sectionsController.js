var Section = require( '../../dbmodels/section' ),
    Image = require( '../../dbmodels/image' ),
    path = require( 'path' ),
    mkdir = require( 'mkdir' ),
    fs = require( 'fs' );

module.exports = {
    getAllSections: function( req, res ) {
        Section.find( {} )
            .then( function( sections ) {
                res.render( 'administration/sections/sections', { sections: sections } );
            } );
    },
    editSection: function( req, res ) {
        Section.findById( req.params.id, function( err, section ) {
            res.render( 'administration/sections/editSection', section );
        } );
    },
    updateSection: function( req, res ) {
        Section.findByIdAndUpdate( req.params.id, {
            name: req.body.sectionName,
            heading: req.body.sectionHeading,
            body: req.body.sectionBody,
            description: req.body.sectionDescription
        }, function( err, section ) {
            if( err ) {
                req.session.errorMsg = 'Error updating section!';
                res.redirecy( '/manage/sections' );
            } else {
                res.redirect( '/manage/sections' );
            }
        } );
    },
    deleteSection: function( req, res ) {
        Section.findByIdAndRemove( req.params.id, function( err, section ) {
            if( err ) {
                req.session.errorMsg = 'Error deleting section!';
                res.redirect( '/manage/sections' );
            }
        } );
        res.redirect( '/manage/sections' );
    },
    createSection: function( req, res ) {
        res.render( 'administration/sections/createSection' );
    },
    insertSection: function( req, res ) {
        var IMAGE_DIR = path.normalize( path.join( __dirname, '../../../public/images/' ) ),
            section = req.body;
        var sec = new Section( {
            name: section.sectionName,
            heading: section.sectionHeading,
            body: section.sectionBody,
            description: section.sectionDescription
        } );
        mkdir.mkdirsSync( IMAGE_DIR + section.sectionName );
        if( req.files ) {
            Object.keys( req.files ).forEach( function( key ) {
                req.files[ key ]
                    .mv( IMAGE_DIR + section.sectionName + '/' + req.files[ key ].name,
                        function( err ) {
                            if( err ) {
                                req.session.errorMsg = 'Error uploading image/s!';
                                res.redirect( '/manage/sections' );
                            }
                        }
                    );
                sec.images.push( new Image( {
                    url: '/images/' + section.sectionName + '/' + req.files[ key ].name,
                    fileName: req.files[ key ].name
                } ) );
            } );
        }
        sec.save( function( err, sec ) {
            if( err ) req.session.globalErr = 'Error creating section!';
            res.redirect( '/manage/sections' );
        } );
    }
};