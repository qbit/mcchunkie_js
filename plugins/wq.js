// Desc: print the tales of Wq
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp; 
  
  if (! store.phrases) {
  	store.phrases = [
    'Master Wq was eating his luncheon when a student burst into his room and knelt at his feet. Tears were in his eyes and he seemed profoundly frustrated. Master Wq put down his bowl and asked, “What upsets you so, young man?”\t“Master,” he said. “I give up. I will never attain mastery of Vim! I will never learn the ways of the great patriarchs! I will never attain the brutal simplicity, the divine emptiness of perfectly efficient Vim usage!”\t“Why do you say this?”\t“I am your worst student, by far. When I am struggling with writing a simple macro, my fellow students are writing recursive macros with ease. When I am trying to remember the regular expression for white space characters, my fellow students are writing cyclomatic complexity tests in Vimscript. I am too slow, and I am ashamed, and I am afraid I have failed.”\tMaster Wq stood up. “Come with me to the window,” he said.\tThe student got up and followed Master Wq to the window, and looked across the street to Master Wq’s neighbour’s house. Through the window, the two could see a young man in suit and tie, working on a document.\t“What do you see?” asked Master Wq. The student watched for a while.\t“That young man is using Microsoft Excel to generate a spreadsheet. He is updating every single cell by hand. He doesn’t even know how to use formulas. He makes capital letters by pressing Caps Lock, and then pressing it again when he is done. He is so slow! I do not understand. How can he be so content?”\t“Seeing this young man, how can you not be?” returned Master Wq.\tThe student was immediately enlightened. His name was Qa, and he later became one of the great masters.',	    'A young man begged an audience with Master Wq to read him his latest work, an elegy to the glories of Vim. With tearful eyes he read out his heartfelt words, pouring his soul into his veneration for his text editor.\tThe master sat and listened to the poet for a while. After the tenth verse, he held up his hand. “Please, no more. Your poem is awful.”\tThe young man was very angry.\t“Master Wq, surely you of all people can best appreciate the poem, you who know the great beauty of the editor. How can you be so terse, so dismissive? I even wrote this poem in Vim!”\t“You wrote it in Vim,” said the Master. “But your meter is uneven, your rhyming pattern inconsistent, your metaphors mixed. You have written a very bad poem using a very good tool. You are not a poet, and Vim will not make you one; many of my students are not programmers, and Vim will not help them either.”\t“Vim is eternally beautiful,” protested the poet. “It is a worthy subject for an elegy.”\t“Vim is not permanent. nvi is not permanent. vi itself is not permanent, only vi-nature. Emacs has vi-nature, nano has vi-nature, even Notepad has vi-nature. You narrow your sights, you grow attached, and hence you do not grasp the true value of your poem’s subject. You must leave. Come back when you have mastered Emacs.”\tThe poet left, deeply ashamed. He never returned.',
    'A student enquired of Master Wq, “When will I know I have mastered Vimscript?”\tMaster Wq answered, “When you never use it.”',
    'One night there was a storm, and Master Wq’s house collapsed. The next morning he began to build it again using his old tools. His novice came to help him, and they built for a while and were making good progress. As they worked, the novice began to tell Master Wq of his latest accomplishments.\t“Master, I have developed a wonderful Vim script to give all sorts of useful information about a document. It counts the words, the sentences, the paragraphs, and even tells you what kind of document it is using the syntax highlighting rules. I use it in my pipelines all the time. It is a thing of beauty, and I am very proud. Truly, Vim is the greatest tool!”\tMaster Wq did not reply. Thinking he had unwittingly angered his master, the novice fell silent and continued his work.\tThe novice finished aligning two beams and had positioned a nail ready for beating into the wood, but found the hammer was out of reach.\t“Would you pass me the hammer, master?”\tMaster Wq handed the novice a saw.\tAt once, the novice was enlightened.',
    'A Markdown acolyte came to Master Wq to demonstrate his Vim plugin.\t “See, master,” he said, “I have nearly finished the Vim macros that translate Markdown into HTML. My functions interweave, my parser is a paragon of efficiency, and the results nearly flawless. I daresay I have mastered Vimscript, and my work will validate Vim as a modern editor for the enlightened developer! Have I done rightly?”\tMaster Wq read the acolyte’s code for several minutes without saying anything. Then he opened a Markdown document, and typed:\t:%!markdown\tHTML filled the buffer instantly. The acolyte began to cry.',
    'One day a monk visited Master Wq, and inquired, “Master, how will my code be different when I have mastered Vim?”\tMaster Wq answered, “Before Vim: declare, define, process, print. After Vim: declare, define, process, print.”'
	  ];
  }

  if ( msg.match( /^:wq/ ) ) {
    resp = store.phrases[ helper.rand( store.phrases.length ) ];
  }

  setTimeout( function() {
    cb.call( null, to, from, resp, proto );
  }, 10000 );
});
