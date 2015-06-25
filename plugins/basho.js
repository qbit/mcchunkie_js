// Desc: print haikus from Basho
(function( helper, to, from, msg, store, sh_store, cb, proto ) {
  'use strict';
  var resp;
  if ( ! store.phrases ) {
	  store.phrases = [
		"A autumn wind\n More white\n Than the rocks in the rocky mountain.\n",
		"A caterpillar\n this deep in fall\n still not a butterfly\n",
		"A cold rain starting\n And no hat --\n So?\n",
		"A cuckoo cries,  \n and through a thicket of bamboo  \n the late moon shines \n",
		"A dragonfly, trying to –\n oops, hang on to the upside\n of a blade of grass\n",
		"A green willow, \n dripping down into the mud, \n at low tide.  \n",
		"A lightning gleam:\n into darkness travels\n a night heron's scream.\n",
		"A little girl under a peach tree,\n Whose blossoms fall into the entrails\n Of the earth.\n",
		"A lovely spring night  \n suddenly vanished while we  \n viewed cherry blossoms\n",
		"A mountain pheasant cry \n fills me with fond longing for \n father and mother\n",
		"A solitary  \n crow on a bare branch-  \n autumn evening \n",
		"A thicket of summer grass\n Is all that remains\n Of the dreams of ancient warriors.\n",
		"A weathered skeleton\nin windy fields of memory,\npiercing like a knife\n",
		"A wild sea-\n In the distance over Sado\n The Milky Way.\n",
		"All along this road  \n not a single soul – only  \n autumn evening comes \n ",
		"All day in grey rain\n hollyhocks follow the sun's\n invisible road\n",
		"All my friends\n viewing the moon –\n an ugly bunch\n",
		"All the day long- \n yet not long enough for the skylark,\n singing, singing.\n",
		"All the fields hands  \n enjoy a noontime nap after  \n the harvest moon\n ",
		"All the rains of June\n it brings together, and it is swift --\n the river Morgami.\n",
		"Along my journey  \n through this transitory world,  \n new year's housecleaning \n",
		"Along the roadside, \n blossoming wild roses \n in my horse’s mouth\n",
		"Along this way,\n no travellers.\n Dusk in autumn.\n",
		"Among moon gazers  \n at the ancient temple grounds  \n not one beautiful face \n",
		"An ivy spray\n Trained up over the wall\n And a few bamboos\n Inviting a tempest.\n",
		"As firmly cemented clam-shells\n Fall apart in autumn,\n So I must take to the road again,\n Farewell, my friends.\n",
		"At the ancient pond  \n a frog plunges into  \n the sound of water \n",
		"Autumn approaches  \n and the heart begins to dream  \n of four-tatami rooms \n",
		"Autumn full moon,  \n the tides slosh and foam  \n coming in\n",
		"Awake at night,\n The lamp low,\n The oil freezing.\n",
		"Awakened at midnight  \n by the sound of the water jar  \n cracking from the ice \n",
		"Baby mice in their nest \n squeak in response \n to the young sparrows\n",
		"Behind Ise Shrine,  \n unseen, hidden by the fence,  \n Buddha enters nirvana \n",
		"Black Cloudbank broken\n Scatters in the night...Now see\n Moon-lighted mountains!\n",
		"Breakfast enjoyed  \n in the fine company of  \n morning glories \n",
		"Buddha's Death Day \n from wrinkled praying hands \n the rosaries' sound\n",
		"Bush clover in blossom waves\n Without spilling\n A drop of dew.\n",
		"But for a woodpecker  \n tapping at a post, no sound  \n at all in the house \n",
		"Butterfly -\n Wings curve into\n White poppy.\n",
		"By a singular stroke\n Of luck, I saw a solitary hawk circling\n Above the promontory of Irago.\n",
		"By the old temple, \n peach blossoms; \n a man treading rice.\n",
		"Cedar umbrellas, off  \n to Mount Yoshimo for  \n the cherry blossoms.\n",
		"Chilling autumn rains  \n curtain Mount Fuji, then make it  \n more beautiful to see \n",
		"Cho tori-no\n Shiranu hana ari\n Aki no sora\n Unknown to birds and butterflies\n A flower blooms\n The autumn sky\n",
		"Clouds come from time to time --\n and bring to men a chance to rest\n from looking at the moon.\n",
		"Clouds of cherry blossoms!  \n Is that temple bell in Ueno  \n or Asakusa? \n",
		"Cold as it was\n We felt secure sleeping together\n In the same room.\n",
		"Cold white azalea - \n Lone nun\n Under thatched roof.\n",
		"Come out to view  \n the truth of flowers blooming  \n in poverty \n",
		"Crossing half the sky,  \n on my way to the capital,  \n big clouds promise snow \n",
		"Crossing long fields, \n frozen in its saddle, \n my shadow creeps by\n",
		"Culture's beginnings:  \n rice-planting songs from the heart  \n of the country \n",
		"Dark night - \n Plover crying \n For its nest.\n ",
		"Deep into autumn\n and this caterpillar\n still not a butterfly\n",
		"Delight, then sorrow,  \n aboard the cormorant  \n fishing boat \n",
		"Do the tea-pickers also,\n hidden in the bushes,\n hear the hototogishu?\n",
		"Dying cricket,\n how he sings out\n his life!\n",
		"Eaten alive by \n lice and fleas -- now the horse \n beside my pillow pees\n",
		"Even a wild boar\n With all other things\n Blew in this storm.\n",
		"Even in Kyoto,  \n how I long for Kyoto  \n when the cuckoo sings \n",
		"Even that old horse \n is something to see this \n snow-covered morning\n",
		"Even these long days  \n are not nearly long enough  \n for the skylarks to sing \n",
		"Exhausted, I sought  \n a country inn, but found  \n wisteria in bloom \n",
		"Farewell, my old fan.\n Having scribbled on it,\n What could I do but tear it\n At the end of summer?\n",
		"Firefly viewing -\n Drunken steersman,\n Drunken boat.\n",
		"First snow\n Falling\n On the half-finished bridge.\n",
		"Flower \n under harvest sun - stranger\n To bird, butterfly.\n",
		"For those who proclaim \n they’ve grown weary of children, \n there are no flowers\n",
		"Fresh spring!\n The world is only Nine days old - \n These fields and mountains!\n",
		"Frog pond -- \n A leaf falls in\n Without a sound\n",
		"From all directions\n Winds bring petals of cherry\n Into the grebe lake.\n",
		"From all these trees –  \n in salads, soups, everywhere –  \n cherry blossoms fall \n",
		"From among the peach-trees\n 'Blooming everywhere,' \n The first cherry blossoms.\n",
		"From every direction  \n cherry blossom petals blow  \n into Lake Biwa \n",
		"Gray hairs being plucked,  \n and from below my pillow  \n a cricket singing \n",
		"Hailstones\n Glancing off the rocks\n At Stony Pass.\n",
		"Heard, not seen,  \n the camellia poured rainwater  \n when it leaned \n",
		"Heated spring air\n In tiny waves of an inch or two -\n Above wintery grass.\n",
		"Hello! Light the fire!\n I'll bring inside \n a lovely bright ball of snow\n",
		"How admirable,\n He who thinks not, 'Life is fleeting,'\n When he sees the lightning!\n",
		"How many priests\n How many morning glories\n Have perished under the pine\n Eternal as law?\n",
		"How still it is!\n Stinking into the stones,\n the locusts' trill.\n",
		"How very noble!  \n One who finds no satori \n in the lightning-flash \n",
		"How wild the sea is,  \n and over Sado Island,  \n the River of Heaven\n",
		"Husking rice,  \n a child squints up  \n to view the moon. \n",
		"I didn't die!\n the end of a journey\n is autumn nightfall\n",
		"I felt quite at home,\n As if it were mine sleeping lazily\n In this house of fresh air.\n",
		"I like to wash,\n the dust of this world\n In the droplets of dew.\n",
		"I would like to use  \n that scarecrow's tattered clothes  \n in this midnight frost \n",
		"I'm a wanderer  \n so let that be my name –  \n the first winter rain \n",
		"Ill on a journey,\n all about the dreary fields\n fly my broken dreams.\n",
		"In the bitter radish that\n bites into me, I feel the\n autumn wind\n",
		"In the moonlight a worm\n silently\n drills through a chestnut\n",
		"In this warm spring rain, \n tiny leaves are sprouting \n from the eggplant seed\n",
		"I’ll take these back\n for the city slickers –\n sour chestnuts\n",
		"June clouds,\n At ease on\n Arashiyama Peak.\n",
		"Kannon's* tiled temple  \n roof floats far away in clouds  \n of cherry blossoms  \n (Bodhisattva of Compassion)\n",
		"Kareeda ni\n karasu no tomari keri\n aki no kure\n On dead branches \n Crows remain perched\n At autumn's end.\n",
		"Kiso's chestnuts\n for a person of the floating world\n a souvenir\n",
		"Kochira muke\n Ware mo sabishiki\n Aki no kure\n Will you turn toward me?\n I am lonely too,\n This autumn evening.\n",
		"Lead my pony  \n across this wide moor to where  \n the cuckoo sings \n",
		"Lonely silence,  \n a single cicada's cry  \n sinking into stone \n",
		"Long conversations  \n beside blooming irises –  \n joys of life on the road \n",
		"Melon \n In morning dew,\n mud-fresh.\n",
		"Mii Temple\n knocking on the gate for a wish\n today's moon\n",
		"Misty rain;\n Today is a happy day,\n Although Mt. Fuji is unseen.\n",
		"Mogami River, yanking\n The burning sky\n Into the sea.\n",
		"Morning and evening\n Someone waits at Matsushima!\n One-sided love.\n",
		"Morning glory trailing --\n All day the gate-\n bolt's fastened.\n",
		"My eyes following\n until the bird was lost at sea\n found a small island\n",
		"My horse \n Clip-clopping over the fields--Oh ho!\n I too am part of the picture!\n",
		"My way –\n no-one on the road\n and it’s autumn, getting dark\n ",
		"New Year’s first snow -- ah -- \n just barely enough to tilt \n the daffodil\n",
		"No blossoms and no moon,\n and he is drinking sake\n all alone!\n",
		"Not even a hat --\n and cold rain falling on me?\n Tut-tut! Think of that!\n",
		"Now I see her face,  \n the old woman, abandoned,  \n the moon her only companion \n",
		"O bush warblers! \n Now you’ve shit all over \n my rice cake on the porch\n",
		"Octopus traps -  \n summer’s moonspun dreams,  \n soon ended. \n",
		"Oh, these spring days!\n A nameless little mountain,\n wrapped in morning haze!\n",
		"On Buddha's birthday  \n a spotted fawn is born –\n just like that \n",
		"On Buddha's deathday,  \n wrinkled tough old hands pray –  \n the prayer beads' sound \n",
		"On New Year's Day  \n each thought a loneliness \n as winter dusk descends \n",
		"On a journey,\n Resting beneath the cherry blossoms,\n I feel myself to be in a Noh play.\n",
		"On the cow shed\n A hard winter rain; \n Cock crowing.\n",
		"On the polished surface\n Of the divine glass,\n Chaste with flowers of snow.\n",
		"On the white poppy, \n a butterfly’s torn wing \n is a keepsake\n",
		"On this road \n where nobody else travels\n autumn nightfall\n",
		"Only half the way I came\n To the ancient capital,\n And above my head\n Clouds heavy with snow.\n",
		"Over skylark's song\n Noh cry \n Of Pheasant\n",
		"Over the ruins of a shrine\n a chestnut tree\n still lifts its candles\n",
		"Passing through the world\n Indeed this is just\n Sogi's rain shelter.\n",
		"Petals of the mountain rose\n Fall now and then,\n To the sound of the waterfall?\n",
		"Polished and polished \n clean, in the holy mirror  \n snow flowers bloom \n",
		"Scarecrow in the hillock\n Paddy field --\n How unaware!  How useful!\n",
		"Searching storehouse eaves,  \n rapt in plum blossom smells,  \n the mosquito hums \n",
		"Seas slowly darken  \n and the wild duck's plaintive cry  \n grows faintly white \n",
		"Shake, oh grave!\n The autumn wind\n Is the voice of my wailing.\n",
		"Shizukasa ya\n Iwa ni shimi-iru\n Semi no koe\n Calm and serene\n The sound of a cicada\n Penetrates the rock\n",
		"Should I hold them in my hand,\n They will disappear\n In the warmth of my tears,\n Icy strings of frost.\n",
		"Sick on my journey,\nonly my dreams will wander\nthese desolate moors",
		"Singing, planting rice,  \n village songs more lovely  \n than famous city poems \n",
		"Skylark on moor --\n Sweet song\n Of non-attachment.\n",
		"Sleep on horseback,\n The far moon in a continuing dream,\n Steam of roasting tea.\n",
		"Slender, so slender \n its stalk bends under dew -- \n little yellow flower\n",
		"Sparrow, spare\n The horsefly\n Dallying in flowers.\n",
		"Sparrows \n In rape-field,\n Blossom-viewing.\n",
		"Sparrows in eves\n Mice in ceiling -\n Celestial music.\n",
		"Spring air --\n Woven moon\n And plum scent.\n",
		"Spring departs.\n Birds cry\n Fishes' eyes are filled with tears\n",
		"Spring rain \n conveyed under the trees\n in drops.\n",
		"Spring rain\n Leaking through the roof,\n Dripping from the wasps' nest.\n",
		"Spring too, very soon!\n They are setting the scene for it --\n plum tree and moon.\n",
		"Spring!\n A nameless hill\n in the haze.\n",
		"Stone Mountain\n whiter than the stones \n autumn wind\n",
		"Summer grasses: \n all that remains of great soldiers’ \n imperial dreams\n",
		"Summer in the world;\n floating on the waves \n of the lake.\n",
		"Summer moon -\n Clapping hands, \n I herald dawn.\n",
		"Summer zashiki\n Make move and enter\n The mountain and the garden.\n",
		"Taking a nap,\n Feet planted\n Against a cool wall.\n",
		"Temple bells die out.\n The fragrant blossoms remain.\n A perfect evening!\n",
		"Tethered horse;\n snow\n in both stirrups.\n",
		"That great blue oak  \n indifferent to all blossoms  \n appears more noble\n",
		"The Chestnut by the eaves\n In magnificent bloom\n Passes unnoticed\n By men of this world.\n",
		"The banana tree  \n blown by winds pours raindrops  \n into the bucket \n",
		"The bee emerging \n from deep within the peony \n departs reluctantly\n",
		"The beginning of autumn;\n The sea and fields,\n All one same green.\n",
		"The clouds come and go,  \n providing a rest for all  \n the moon viewers \n",
		"The crescent lights\n The misty ground.\n Buckwheat flowers.\n",
		"The dragonfly\n Can't quite land\n On that blade of grass.\n",
		"The farmer's roadside  \n hedge provided lunch for  \n my tired horse\n",
		"The first day of the year:\n thoughts come - and there is loneliness;\n the autumn dusk is here.\n",
		"The first snow,\n Just enough to bend\n The leaves of the daffodils.\n",
		"The first snow\n the leaves of the daffodil\n bending together\n",
		"The leafless cherry,\n Old as a toothless woman,\n Blooms in flowers,\n Mindful of its youth.\n",
		"The lightning flashes\n And slashing through the darkness,\n A night-heron’s screech.\n",
		"The lilies!\n The stems, just as they are,\n the flowers, just as they are.\n",
		"The moon about to appear,\n all present tonight\n with their hands on their knees.\n",
		"The moon is the guide,\n Come this way to my house,\n So says the host of a wayside inn.\n",
		"The morning glories  \n bloom, securing the gate  \n in the old fence \n",
		"The oak tree stands\n noble on the hill even in\n cherry blossom time\n",
		"The old pond: \n a frog jumps in,- \n the sound of water.\n",
		"The old pond;\n the frog.\n Plop!\n",
		"The petals tremble \n on the yellow mountain rose –\n roar of the rapids\n",
		"The pine tree of Shiogoshi\n Trickles all night long\n Shiny drops of moonlight.\n",
		"The shallows –\n a crane’s thighs splashed\n in cool waves\n",
		"The she cat - \n Grown thin\n From love and barley.\n",
		"The summer's grass!\n all that's left\n of ancient warriors' dreams.\n",
		"The sun's way:\n hollyhocks turn toward it\n through all the rains of May.\n",
		"The temple bell stops.\n But the sound keeps coming\n out of the flowers.\n",
		"The usually hateful crow:\n he, too -- this morning,\n on the snow!\n",
		"The voices of plovers\n Invite me to stare into the darkness\n Of the Starlit Promontory.\n",
		"The warbler sings  \n among new shoots of bamboo  \n of coming old age \n",
		"The wind from Mt. Fuji\n I put it on the fan.\n Here, the souvenir from Edo.\n",
		"The winds of fall\n are blowing, yet how green\n the chestnut burr.\n",
		"The winter leeks\n Have been washed white --\n How cold it is!\n",
		"The winter storm\n Hid in the bamboo grove\n And quieted away.\n",
		"This bright harvest moon  \n keeps me walking all night long  \n around the little pond \n",
		"This first fallen snow  \n is barely enough to bend  \n the jonquil leaves \n",
		"This hot day swept away  \n into the sea by the  \n Mogami River \n",
		"This ruined temple  \n should have its sad tale told only  \n by a clam digger \n",
		"Three months after we saw\n Cherry blossoms together\n I came to see the glorious\n Twin trunks of the pine.\n",
		"Traveling this high  \n mountain trail, delighted  \n by violets \n",
		"Tremble, oh my gravemound,  \n in time my cries will be  \n only this autumn wind \n",
		"Ugoku ha mo\n Naku osoroshiki\n Natsu kodachi \n Even leaves don't move\n Awesome is the\n Summer grove\n",
		"Under the image of Buddha\n All these spring flowers\n Seem a little tiresome.\n",
		"Ungraciously, under  \n a great soldier's empty helmet,  \n a cricket sings \n",
		"Unknowingly he guided us\n over pathless hills\n with wisps of hay\n",
		"Unknown spring --\n Plum blossom\n Behind the mirror.\n",
		"Very brief:\n Gleam of blossoms in the treetops\n On a moonlit night.\n",
		"Wake, butterfly -\n It's late, we've miles\n To go together.\n",
		"Watching for snow,\n the boozers’ faces –\n a flash of lightning\n",
		"Water-drawing rites,  \n icy sound of monks' getas  \n echo long and cold \n",
		"Wet with morning dew  \n and splotched with mud, the melon  \n looks especially cool \n",
		"What luck!\n The southern valley\n Make snow fragrant.\n",
		"Where cuckoo\n Vanishes - \n An island.\n",
		"Whore and monk, we sleep  \n under one roof together,  \n moon in a field of clover \n",
		"Wild boars and all\n are blown along with it --\n storm-wind of fall!\n",
		"Will you turn toward me?\n I am lonely, too,\n this autumn evening.\n",
		"Winter downpour -  \n even the monkey  \n needs a raincoat. \n",
		"Winter rain --\n The field stubble\n Has blackened.\n",
		"Winter seclusion –  \n sitting propped against  \n the same worn post \n",
		"Winter solitude--\n in a world of one color\n the sound of wind.\n",
		"With a warbler for  \n a soul, it sleeps peacefully,  \n this mountain willow\n",
		"With dewdrops dripping,  \n I wish somehow I could wash  \n this perishing world \n",
		"With every gust of wind, \n the butterfly changes its place \n on the willow.\n",
		"With plum blossom scent,  \n this sudden sun emerges  \n along a mountain trail \n",
		"With what kind of voice\n would the spider cry\n in the autumn wind?\n",
		"Won't you come and see\n loneliness? Just one leaf\n from the kiri tree.\n",
		"Wrapping dumplings in  \n bamboo leaves, with one finger  \n she tidies her hair \n",
		"Yagate shinu\n Keshiki wa miezu\n Semi no koe\n Cicadas singing --\n No sign\n Of dying soon.\n",
		"Year’s end, all  \n corners of this  \n floating world, swept.\n",
		"Yellow rose petals\n Thunder - \n A waterfall.\n",
		"a clear waterfall —\n into the ripples\n fall green pine-needles\n",
		"a peasant’s child\n husking rice, pauses\n to look at the moon\n",
		"a sick wild duck\n falling down with the dark cold\n to sleep overnight\n",
		"a strange flower \n for birds and butterflies\n the autumn sky\n",
		"a terrible sound –\n the gilded helmet’s \n trapped cricket\n",
		"above the moor\n not attached to anything\n a skylark singing\n",
		"after the flowers\n all there is left for my haiku\n wisteria beans\n",
		"all night\n autumn winds being heard \n behind the mountains\n",
		"all the more I wish to see\n in those blossoms at dawn\n the face of a god\n",
		"along the mountain road\n somehow it tugs at my heart—\n a wild violet\n",
		"along this road\n going with no one\n autumn evening\n",
		"also green\n it should remain a thing\n the pepper pod\n",
		"at Nara\n the fragrance of chrysanthemums\n ancient Buddhas\n",
		"at my poor hovel\n there’s one thing I can offer —\n small mosquitoes\n",
		"autumn begins\n sea and sprouting rice fields\n one green\n",
		"autumn colors\n without a pot\n of red-brown soup\n",
		"autumn coolness\n hand and hand paring away\n eggplants -- cucumbers\n",
		"autumn deepens\n the man next door\n how is he doing?\n",
		"autumn nears\n my heart is drawn \n to a four-mat room\n",
		"autumn night\n striking and making it crumble\n our small talk\n",
		"autumn wind:\n as thickets in fields are \n Fuwa's barriers\n",
		"autumn wind\n broken with sadness\n his mulberry stick\n",
		"autumn wind\n in Ise's shrine cemetery\n even more lonely\n",
		"autumn winds\n in the sliding door's opening \n a sharp voice\n",
		"bagworm's place\n it seems to be inside\n the cherry blossoms\n",
		"bagworms \n to hear their songs\n come to my hut\n",
		"banana plant in autumn storm\n rain drips into tub\n hearing the night\n",
		"blowing stones\n flying from the volcano Asama\n autumn gale\n",
		"blue seas\n breaking waves smell of rice wine \n tonight's moon\n",
		"borrowing sleep\n from the scarecrow's sleeves\n midnight frost\n",
		"bright red\n the pitiless sun\n autumn winds\n",
		"bush-clover flowers —\n they sway but do not drop\n their beads of dew\n",
		"butt of the tree\n see in the cut end\n today's moon\n",
		"butterflies flit\n in a field of sunlight\n that is all\n",
		"butterflies flit…\n that is all, amid the field\n of sunlight\n",
		"buying a measure box\n now I feel differently\n about moon-viewing\n",
		"chrysanthemum's scent\n in the garden a worn-out sandal \n just the sole\n",
		"chrysanthemums\n flowers blooming\n in the stones\n",
		"cloud-parting friend!\n temporarily this wild goose\n must go away\n",
		"cricket \n forgetting sounds with its cry\n by the fireplace\n",
		"departing autumn\n with hands spread open\n chestnut burs\n",
		"don't imitate me\n we are not two halves\n of a muskmelon\n",
		"drinking morning tea\n the monk is peaceful\n the chrysanthemum blooms\n",
		"ear of the pine tree\n mushroom on a strange tree\n with a leaf stuck to it\n",
		"failing health\n chewing dried seaweed\n my teeth grate on sand\n ",
		"famous moon!\n circling the pond all night\n even to the end\n",
		"flower of the harvest moon?\n it only looks that way\n a cotton field\n",
		"for one touched by monkey cries\n how is it when a child's abandoned\n in autumn winds\n",
		"fragrant orchid—\n into a butterfly’s wings\n it breathes incense\n",
		"from this very day\n erase the inscription with dew\n on the bamboo hat\n",
		"full autumn moon\n to my gate comes rising\n crested tide\n",
		"grabbing at straws\n the strength to bear\n our parting\n",
		"hair shaved in a moon-shape\n with their hands on their knees\n in the early hours of night\n",
		"harvest moon\n northland weather\n uncertain skies\n",
		"higher than a skylark\n resting in the sky \n on a mountain pass\n",
		"how piteous!\n beneath the soldiers helmet\n chirps a cricket\n",
		"in blossoms\n a horsefly plays… don’t eat it\n friend-sparrow\n",
		"in my new clothing\n i feel so different, i must\n look like someone else\n",
		"in the blossoms’ shade\n as in the noh drama\n a traveller sleeps\n",
		"in the cow shed\n mosquito's voice darkens \n lingering heat\n",
		"in the world outside\n is it harvesting time?\n the grass of my hut\n",
		"in your summer-room...\n garden and mountain going too\n as we slowly walk\n",
		"it is spring!\n a hill without a name\n in thin haze\n",
		"kono aki wa nande\n toshiyoru kumo ni tori\n this autumn \n as-for why grow old \n cloud to bird\n",
		"kono michi ya yuku hito nashi ni aki no kure\n this road go \n person nonexistent \n with autumn’s evening\n",
		"looking carefully,\n a shepherds purse is blooming\n under the fence\n",
		"lotus pond\n as they are unplucked\n Souls' Festival\n",
		"low tide morning...\n the willow skirts are tailed\n in stinking mud\n",
		"moonless night...\na powerful wind embraces\nthe ancient cedars\n",
		"not to think of yourself\n as someone who did not count --\n Festival of the Souls\n",
		"occasional clouds\n one gets a rest\n from moon-viewing\n",
		"on a bare branch\n a crow has settled\n autumn dusk\n",
		"on this mountain\n tell me of its sorrow\n wild-yam digger\n",
		"overhanging pine...\n adding its mite of needles\n to the waterfall\n",
		"people no longer live\n at the Fuwa Barrier\n in a house with wooden eaves\n",
		"petal by petal\n yellow mountain roses fall—\n sound of rapids\n",
		"rainy day\n the world's autumn closes\n Boundary Town\n",
		"resting higher\n than a lark in the sky\n a mountain pass\n",
		"saying farewell to people\n farewell being said to me brings\n autumn in Kiso\n",
		"secretly at night\n a worm under the moon\n bores into a chestnut\n",
		"shaking the grave\n my weeping voice\n autumn wind\n",
		"sleeping in the temple\n the serious-looking face\n is moon-viewing\n",
		"so clear the sound\n echoes to the Big Dipper\n the fulling block\n",
		"soon to die\n yet no sign of it\n in the cidada's chirpNothing in the cry \n of cicadas suggests they \n are about to die\n",
		"souls' festival\n today also there is smoke\n from the crematory\n",
		"speaking out\n my lips are cold\n in autumn wind\n",
		"spiders have a cry?\n well, what is chirping\n autumn's wind?\n",
		"stillness\n piercing the rocks\n cicada's shrill\n",
		"taken in my hand\n it will vanish in hot tears \n autumn frost\n",
		"temple bell\n also sounds like it is\n cicada's voice\n",
		"the farmer's child \n rests from husking rice\n then sees the moon\n",
		"the full moon \n seven story-songs of a woman\n turning towards the sea\n",
		"the moon so pure\n a wandering monk carries it\n across the sand\n",
		"the moon still is\n though it seems far from home\n Suma in summer\n",
		"the moon:\n I wandered around the pond\n all night long\n",
		"the sea darkens —\n the voices of the wild ducks\n are faintly white\n",
		"the setting moon\n the thing that remains\n four corners of his desk\n",
		"the village so old\n there's not a single house \n without a persimmon tree\n",
		"the whole family\n all with white hair and canes\n visiting graves\n",
		"thin from the Kiso trip\n and still not yet recovered\n the late harvest moon\n",
		"this autumn\n as reason for growing old\n a cloud and a bird\n",
		"this autumn\n why am I aging so?\n to the clouds a bird\n",
		"though a skylark sings\n beating inside\n the pheasant's sad cry\n",
		"though autumn winds blow\n it is still green\n bur of the chestnut\n",
		"to Kyoto\n still half the sky to go—\n snowy clouds\n",
		"turn this way!\n I too feel lonely\n late in autumn\n",
		"under my tree-roof\n slanting lines of april rain\n separate to drops\n",
		"very exciting\n yet after awhile so sad\n cormorant fishing\n",
		"viewing the moon\n no one at the party\n has such a beautiful face\n",
		"walking on and on \n even through I fall down sick\n in fields of clover\n",
		"weathered bones\n just thinking of the wind\n it pierces my body\n",
		"where's the moon?\n as the temple bell is --\n sunk in the sea\n",
		"while growing thin\n without a reason\n the chrysanthemum bud\n",
		"white chrysanthemum\n catching in one's eye\n nary a speck of dust\n",
		"without turning\n into a butterfly, autumn deepens \n for the worm\n",
		"your hermitage\n the moon and chrysanthemums \n plus an acre of rice fields\n",
	  ];
  }

  if ( msg.match(/^basho$/) ) {
	  resp = store.phrases[ helper.rand( store.phrases.length ) ];
  }

  cb.call( null, to, from, resp, proto );
});
