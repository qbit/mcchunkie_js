// Desc: feed the bot!
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';

  if (msg.match(/^\/help$|^help:$/)) {
		resp = 'botname: botsnack - give mcchunkie a snack!';

                cb.call(null, to, from, resp, proto);
                return;
  }

  var snacks = [
    'omm nom nom nom',
    '*puke*',
    'MOAR!',
    '=.='
  ];
  var resp = "";
  if ( helper.isRelevant( msg ) ) {
    if ( msg.match( 'botsnack' ) ) {
      resp = snacks[ helper.rand( snacks.length ) ];
    }
  }
  cb.call( null, to, from, resp, proto );
});
