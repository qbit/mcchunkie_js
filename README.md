mcchunkie
=========
![mcchunkie](https://raw.github.com/qbit/mcchunkie/master/mcchunkie.png)

an irc bot with dynamically loadable plugins.

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

* **aprs.js** -  query the FCC license database for license info. *requires api key for aprs.fi*
* **basho.js** -  print haikus from Basho
* **beer.js** -  query brewerydb for delicious delicious beer
* **botsnack.js** -  feed the bot!
* **dayum.js** -  Daaayum Daaayyyyuuummm DAAAAAAYYYYUUUUMMMMMMMM
* **dolan.js** -  translate to dolantalk
* **emacs.js** -  we are emacs!
* **ermahgerd.js** -  translate to ermahgerd talk
* **free.js** -  no one is as free as 'Merika!
* **getoverhere.js** -  mortal kombat style ~~~~~~>
* **ham.js** -  query the FCC license database for license info.
* **ham_tests.js** -  quiz players on Extra, General and Tech exams for Ham Radio.
* **high5.js** -  respond to high5's
* **howmany.js** -  query openbsd ports for maintainer count info
* **love.js** -  respond to people who love us
* **mojo.js** -  I got my mojo workin!
* **navi.js** -  HEY LOOK!!!!! AHHHHHHHH!
* **openbsd.js** -  uses the pubsub 
* **oyfb.js** -  respond randomly to ooyfb
* **pew.js** -  get shot with LASERS!
* **pigpen.js** -  translate text to pigpen
* **protip.js** -  return random protips
* **puny.js** -  translate strings to punycode
* **putitback.js** -  once a table has been fliped, politely put it back
* **random_info.js** -  tell everyone about OpenSSH's native vpn capability
* **reverse.js** -  reverse a string
* **sballs.js** -  do you know SpaceBalls?
* **tell.js** -  tell $person $msg next time you see them
* **thanks.js** -  be polite
* **tmnt.js** -  return random TMNT quotes (really hard to find good ones!)
* **twss.js** -  watch incoming messages for possible twss jokes. Can be trained.
* **uptime.js** -  print bot's uptime
* **version.js** -  print version information
* **wb.js** -  respond to welcom backs
* **weed.js** -  search leafly for types of weed (requires api key)
* **wq.js** -  print the tales of Wq
* **xmas.js** -  ride the joly train on xmas!
* **yeah.js** -  pull a sweet CSI move
* **ykysaw.js** -  you know you're South African when

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

Installation
=================
    git clone <repo>;
    cd <repo>;
    npm install;
    node bin/mcchunkie -h


Usage
==================
````-n <nick> -s <server> -c <chan1>,<chan2> -j <xmpp jid> -p <xmpp password>````

**Example:**
````
nodejs bin/mcchunkie -n 'nameOfBot' -s 'host' -c 'channelName'
````
