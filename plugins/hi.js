// Desc: hi
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
	'use strict';
	var resp;
	if ( helper.isRelevant( msg ) ) {
		if ( msg.match( /hi/i ) ) {
			from = from || to;
			resp = "hi " + from;
		}
	}
	cb.call( null, to, from, resp, proto );
});
