var mongoose = require( 'mongoose' ),
    imageSchema = require( './image' ).imageSchema,
    beautifyUnique = require( 'mongoose-beautiful-unique-validation' ),
    sectionSchema = mongoose.Schema( {
        name: { type: String, required: 'Section name is required!' },
        heading: { type: String, required: 'Section heading is required!' },
        body: { type: String },
        description: { type: String },
        images: [ imageSchema ]
    } );

sectionSchema.plugin(beautifyUnique);

var Section = mongoose.model( 'Section', sectionSchema );

module.exports = Section;