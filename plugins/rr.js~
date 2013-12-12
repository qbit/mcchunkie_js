(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp, lyr = [
    'I just wanna tell you how I’m feeling',
    'Gotta make you understand…',
    'Never gonna give you up',
    'Never gonna let you down',
    'Never gonna run around and desert you',
    'Never gonna make you cry',
    'Never gonna say goodbye',
    'Never gonna tell a lie and hurt you'
  ];

  if ( ! store.nlyg ) {
    store.nlyg = function() {
      var i,l;
      function say( m ) {
        setTimeout( function() {
          cb.call( null, to, from, m );
        }, Math.ceil( Math.random() * 9000 ));
      }
      for( i = 0, l = lyr.length; i < l; i++ ) {
        say(lyr[i]);
      }
    };
  }

  if ( msg.match( /^rr$/ ) ) {
    store.nlyg();
  }
  // cb.call( null, to, from, resp );
});
