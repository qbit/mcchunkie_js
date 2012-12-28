(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;
  // if ( helper.isRelevant( msg ) ) {
  // }

  // if ( msg === helper.botname + ': help' ) {
  // }
  if ( msg.match( /^merry christmas/i ) ) {
    resp = [
      "˛ °.★__ *★* *˛.",
      "˛ °_██_*。*./ \ .˛* .˛.*.★* *★ 。*",
      "˛. (´• ̮•)*˛°*/.♫.♫\*˛.* ˛_Π_____. * ˛*",
      ".°( . • . ) ˛°./• '♫ ' •\.˛*./______/~＼ *. ˛*.。˛* ˛. *。",
      "*(...'•'.. ) *˛╬╬╬╬╬˛°.｜田田 ｜門｜╬╬╬╬ .",
      "... ... ¯˜\"*°•♥•°*\"˜¯`´¯˜\"*°•♥•°*\"˜¯` ´¯˜\"*°´¯˜\"*°•♥•°*\"˜¯`´¯˜\"*°•"
    ];

    resp = resp.join( '\n' );
  }

  // cb.call( null, to, from, resp );
});
