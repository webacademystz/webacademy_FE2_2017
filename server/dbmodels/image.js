var mongoose = require( 'mongoose' ),
    imageSchema = mongoose.Schema( {
        url: { type: String, required: 'Can not upload an image with empty url!!!', unique: true }, //'Image with this url already exists!!!' },
        uploadingDate: { type: Date, default: new Date() },
        fileName: { type: String }
    } );

var Image = mongoose.model( 'Image', imageSchema );
module.exports = Image;
module.exports.imageSchema = imageSchema;