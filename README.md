mcchunkie
=========
![mcchunkie](https://raw.github.com/qbit/mcchunkie/master/mcchunkie.png)

mcchunkie is an irc bot with dynamically loadable plugins.

Features
========

* **Dynamic plugins**
* **Chat as bot** ( using mcchat )
* **Subscribes to "botname:*" [redis](http://redis.io) pubsub** 
* **Ability to chat "messages" from pubsub** ( see messages/ for
  examples )
* **Persistent storage for pubsub'd messages**

Plugin Features
===============

* **beer** - search brewerydb for beer!
* **botsnack** - feed the bot!
* **dayum** - Daaayum Daaayyyyuuummm DAAAAAAYYYYUUUUMMMMMMMM
* **dolan** - translate to dolantalk
* **ermahgerd** - translate to ermahgerd talk
* **high5** - bot will respond with a "o/" or "\o".
* **love** - give some love, get some love.
* **navi** - HEY LOOK!!!!! AHHHHHHHH!
* **openbsd** - uses the pubsub / storage features and an external app (
  [openbsd_mon](https://github.com/qbit/openbsd_mon) to keep track of openbsd 
  snapshot releases.
* **pew** - get shot with LASERS!
* **ports** - use sqlports to search the openbsd ports tree for various
  thngs.
* **reverse** - reverse a string.
* **thanks** - be polite.
* **tmnt** - respond with random teenage mutant ninja turtles quotes.
* **twss** - watch incoming messages for possible twss jokes.  Can be
  trained.
* **version** - spits out the version of node.js the bot is running on.
* **wb** - respond to welcom back requests.
* **qw** - Tell the story of Wq.
* **yeah** - when bot sees "CSI" it puts on sunglasses.. waits 5 seconds.. 
  says YEAAAAAH!
* **template** - quick plugin template for next gen templates.

Writing Plugins
===============

Plugins should be javascript functions wrapped in (); and should take
six args: botname, to, from, msg, store and callback.

The callback should be passed null, to, from, and resp.

Example:

````javascript
(function( botname, to, from, msg, store, cb ) {
  // Plugin to reverse every msg that is passed in.
  var resp = msg.split("").reverse().join("");

  // do something awesome with storage here..

  // do some more manip of the msg here

  cb.call( null, to, from, resp );
});
````
To disable a plugin, simple add a '''~''' to the name.

