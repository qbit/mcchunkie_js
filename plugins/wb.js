(function( botname, to, from, msg ) {
	'use strict';
	if ( msg === botname + ': wb'  || msg === 'wb ' + botname ) {
		console.log( 'shanks ' + to + '!' );
	}
});
