(function(helper, to, from, msg, store, sh_store, cb, proto) {
    'use strict';
    var resp;

    if (!store.counter) {
	store.counter = 0;
    }

    if (msg.match(/^\d+(\.\d{1,2})?$/)) {
	store.counter++;
    }

    if (store.counter > parseInt(Math.random() * 11)) {
	resp = "and that's NUMBERWANG!!";
	store.counter = 0;
    }

    cb.call(null, to, from, resp, proto);
});
