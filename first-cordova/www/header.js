// Define a click binding for all anchors in the page
$( "a" ).on( "click", function( event ) {

	// Prevent the usual navigation behavior
	event.preventDefault();

	// Alter the url according to the anchor's href attribute, and
	// store the data-foo attribute information with the url
	$.mobile.navigate( $(this).attr( "href" ), {
		foo: $(this).attr("data-foo")
	});
	
});

// Respond to back/forward navigation
$( window ).on( "navigate", function( event, data ){
	if ( data.state.foo ) {
		// Make use of the arbitrary data stored
	}

	if ( data.state.direction == "back" ) {
		// Make use of the directional information
	}

	// reset the content based on the url
	alterContent( data.state.url );
});

