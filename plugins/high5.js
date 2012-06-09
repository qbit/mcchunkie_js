(function( botname, to, from, msg ) {
	'use strict';
	if ( msg === botname + ': o/'  || msg === 'o/ ' + botname ) {
		console.log( 'shanks ' + to + '!' );
	}
});
