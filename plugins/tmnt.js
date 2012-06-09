(function( helper, to, from, msg, store, cb ) {
	'use strict';
  var resp, phrases = [
    "Yee haw! Ninja cowboy!",
    "A true Ninja is a master of himself and his environment, so don't forget: We're turtles!",
    "The rat is the cleanest one.",
    "Amazing, guys, and I thought all the really good dungeons were in Europe.",
    "Yeah, remind me to drop a line to Ralph Nader!",
    "Boy, whatever happened to 'service with a smile'?",
    "SHREDDER!"
  ];

  if ( helper.isRelevant( msg ) && msg.indexOf( 'tmnt' ) > -1 ) {
    resp = phrases[ Math.floor( Math.random() * phrases.length ) ];
  }

  cb.call( null, to, from, resp );
});
