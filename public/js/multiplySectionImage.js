$( document ).ready(function() {
    $( document ).on( 'click', '#add-section-image', function() {
        var formGroup = $( '<div class="form-group"/>' ),
            $container = $( '#upload-images-field' ),
            counter = $container.children().length,
            $sectionImage = $( '<input />' )
            .attr( { 'type': 'file' } )
            .addClass( 'form-control' )
            .attr( { 'name': 'sectionImage_' + counter } );
        formGroup.append( $sectionImage );
        $container.prepend( formGroup );
    } );
} );