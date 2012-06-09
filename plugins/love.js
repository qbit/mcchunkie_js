(function( helper, to, from, msg, store, cb ) {
	'use strict';
  var resp, phrases = [
    'I am not ready for this kind of relationship!',
    'ಠ_ಠ',
    'I love you too! HAVE MY BABBY!!',
    '(╯‵Д′)╯彡┻━┻'
  ];
  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( /i love you/i ) ) {
      resp = from + ', ' + phrases[ helper.rand( phrases.length ) ];
    }
  }
  cb.call( null, to, from, resp );
});
