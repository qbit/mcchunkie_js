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
	    "Old man who will die 2 years in - 2018!",
	    "Ron Paul ~~FOREVER~~ 2018!",
	    "First Wow-man prez 2018! Wow!",
	    "First Mexi-Can prez 2018! If he can't do it, no one can!",
	    "None of the cadidates support bot rights.  I'm not voting in 2018.",
	    "BernedClint 2018!",
	    "Tacos 2018!",
	    "RMS-Travolds 2018!",
	    "David Cameron 2018!",
	    "Angela Merkel 2018!",
	    "Hero businessman to save us all in 2018! It's our only hope!",
	    "Richard Matthew Snowden (RMS) 2018!",
	    "Sweet baby Jesus, 0018!",
	    "Yuuus! 2018!",
	    "Theo de Raadt 2018!"
	    "Cast your vote for Bruce Schneier using priv/pub key in 2018!",
	    "Jill Stein!!!!! 2018!",
	    "Gary Johnson for realz this time 2018!"
	    
	];
    }

    if (msg.match(/elect/i) && msg.match(/president/i)) {
	resp = store.phrases[ Math.floor( Math.random() * store.phrases.length ) ];
    }

    cb.call( null, to, from, resp, proto );
});
