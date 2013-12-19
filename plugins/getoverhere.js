(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if (msg.match(/^getoverhere: (.*)$/i)) {
	  msg = msg.replace(/^getoverhere: /, '');
	  var str = '~~~~>' + msg,
	  count = setInterval(function() {
		  str = str.replace(/~/, '');

		  if ( str.match(/~/) ) {
			  client.say( to || from, str );
		  } else {
			  client.say( to || from, str );
			  client.say( to || from, 'FINISHHIM!!!' )
			  clearInterval(count);
		  }
	  },1000);
  }

  // cb.call( null, to, from, resp );
});
