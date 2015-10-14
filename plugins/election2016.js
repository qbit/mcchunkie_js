// Desc: you elect, we elect, we all elect for Trumplin 2018!
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
    'use strict';
    var resp;

    if (! store.phrases) {
	store.phrases = [
	    "Trumplin 2018!",
	    "Jeblin 2018!",
	    "TrumpJeb 2018!",
	    "Email Lady 2018!",
	    "Old man who will die 2 years in - 2018!"
	];
    }

    if (msg.match(/elect/i) && msg.match(/president/i)) {
	resp = store.phrases[ Math.floor( Math.random() * store.phrases.length ) ];
    }

    cb.call( null, to, from, resp, proto );
});
