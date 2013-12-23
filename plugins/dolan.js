// Desc: translate to dolantalk
(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp, trans = {
    'ready': 'redy',
    'way': 'wey',
    'defile': 'difile',
    'what': 'wut',
    'anal': 'anul',
    'daisy': 'desiu',
    'please': 'pls',
    'afternoon': 'aftarnun',
    'delight': 'dilight',
    'kill': 'kil',
    'goofy': 'gooby',
    'reason': 'raisin',
    'watch': 'wach',
    'come': 'cum',
    'bugs': 'bogs',
    'gonna': 'gon',
    'hey': 'hay',
    'nephews': 'nepews',
    'batman': 'batmnn',
    'some': 'som',
    'whats': 'wats',
    'special': 'speshil',
    'report': 'raprt',
    'million': 'mlin',
    'streets': 'strets',
    'shame': 'shaem',
    'wallstreet': 'walt str',
    'sports': 'sprots',
    'still': 'stil',
    'lose': 'lus',
    'beer': 'bier',
    'take': 'taek',
    'bring': 'brign',
    'cold': 'culd',
    'lets': 'lez',
    'to': 'tu',
    'garden': 'gurden',
    'love': 'luv',
    'hello': 'helo',
    'animal': 'animel',
    'service': 'servic',
    'sleep': 'slip',
    'cash': 'kash',
    'borrow': 'borwo',
    'your': 'ur',
    'broke': 'brok',
    'sure': 'suer',
    'anything': 'anytihg',
    'wrong': 'worgn',
    'drive': 'driev',
    'drugs': 'baffslts',
    'my': 'mi',
    'share': 'shrr',
    'you': 'u',
    'with': 'wfi',
    'all': 'al',
    'book': 'buk'
  }, parts, i,l;

  if ( msg.match( /^dolan:/i ) ) {
    parts = msg.split( ' ' ); 
    for ( i = 1, l = parts.length; i < l; i++ ) {
      parts[i] = trans[ parts[i] ] || parts[i];
    }

    parts.shift();

    resp = parts.join( ' ' );
  }

  cb.call( null, to, from, resp );
});
