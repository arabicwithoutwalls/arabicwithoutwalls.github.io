_global.osUsed = substring(System.capabilities.os,0,3);
var arabicLetters:Array = [{id:1,base:"ء",isolated:"ﺀ",final:"",medial:"",initial:"",joinType:"U"},
{id:2,base:"آ",isolated:"ﺁ",final:"ﺂ",medial:"",initial:"",joinType:"R"},
{id:3,base:"أ",isolated:"ﺃ",final:"ﺄ",medial:"",initial:"",joinType:"R"},
{id:4,base:"ؤ",isolated:"ﺅ",final:"ﺆ",medial:"",initial:"",joinType:"R"},
{id:5,base:"إ",isolated:"ﺇ",final:"ﺈ",medial:"",initial:"",joinType:"R"},
{id:6,base:"ئ",isolated:"ﺉ",final:"ﺊ",medial:"ﺌ",initial:"ﺋ",joinType:"D"},
{id:7,base:"ا",isolated:"ﺍ",final:"ﺎ",medial:"",initial:"",joinType:"R"},
{id:8,base:"ب",isolated:"ﺏ",final:"ﺐ",medial:"ﺒ",initial:"ﺑ",joinType:"D"},
{id:9,base:"ة",isolated:"ﺓ",final:"ﺔ",medial:"",initial:"",joinType:"R"},
{id:10,base:"ت",isolated:"ﺕ",final:"ﺖ",medial:"ﺘ",initial:"ﺗ",joinType:"D"},
{id:11,base:"ث",isolated:"ﺙ",final:"ﺚ",medial:"ﺜ",initial:"ﺛ",joinType:"D"},
{id:12,base:"ج",isolated:"ﺝ",final:"ﺞ",medial:"ﺠ",initial:"ﺟ",joinType:"D"},
{id:13,base:"ح",isolated:"ﺡ",final:"ﺢ",medial:"ﺤ",initial:"ﺣ",joinType:"D"},
{id:14,base:"خ",isolated:"ﺥ",final:"ﺦ",medial:"ﺨ",initial:"ﺧ",joinType:"D"},
{id:15,base:"د",isolated:"ﺩ",final:"ﺪ",medial:"",initial:"",joinType:"R"},
{id:16,base:"ذ",isolated:"ﺫ",final:"ﺬ",medial:"",initial:"",joinType:"R"},
{id:17,base:"ر",isolated:"ﺭ",final:"ﺮ",medial:"",initial:"",joinType:"R"},
{id:18,base:"ز",isolated:"ﺯ",final:"ﺰ",medial:"",initial:"",joinType:"R"},
{id:19,base:"س",isolated:"ﺱ",final:"ﺲ",medial:"ﺴ",initial:"ﺳ",joinType:"D"},
{id:20,base:"ش",isolated:"ﺵ",final:"ﺶ",medial:"ﺸ",initial:"ﺷ",joinType:"D"},
{id:21,base:"ص",isolated:"ﺹ",final:"ﺺ",medial:"ﺼ",initial:"ﺻ",joinType:"D"},
{id:22,base:"ض",isolated:"ﺽ",final:"ﺾ",medial:"ﻀ",initial:"ﺿ",joinType:"D"},
{id:23,base:"ط",isolated:"ﻁ",final:"ﻂ",medial:"ﻄ",initial:"ﻃ",joinType:"D"},
{id:24,base:"ظ",isolated:"ﻅ",final:"ﻆ",medial:"ﻈ",initial:"ﻇ",joinType:"D"},
{id:25,base:"ع",isolated:"ﻉ",final:"ﻊ",medial:"ﻌ",initial:"ﻋ",joinType:"D"},
{id:26,base:"غ",isolated:"ﻍ",final:"ﻎ",medial:"ﻐ",initial:"ﻏ",joinType:"D"},
{id:27,base:"ـ",isolated:"ـ",final:"ـ",medial:"ـ",initial:"ـ",joinType:"D"},
{id:28,base:"ف",isolated:"ﻑ",final:"ﻒ",medial:"ﻔ",initial:"ﻓ",joinType:"D"},
{id:29,base:"ق",isolated:"ﻕ",final:"ﻖ",medial:"ﻘ",initial:"ﻗ",joinType:"D"},
{id:30,base:"ك",isolated:"ﻙ",final:"ﻚ",medial:"ﻜ",initial:"ﻛ",joinType:"D"},
{id:31,base:"ل",isolated:"ﻝ",final:"ﻞ",medial:"ﻠ",initial:"ﻟ",joinType:"D"},
{id:32,base:"م",isolated:"ﻡ",final:"ﻢ",medial:"ﻤ",initial:"ﻣ",joinType:"D"},
{id:33,base:"ن",isolated:"ﻥ",final:"ﻦ",medial:"ﻨ",initial:"ﻧ",joinType:"D"},
{id:34,base:"ه",isolated:"ﻩ",final:"ﻪ",medial:"ﻬ",initial:"ﻫ",joinType:"D"},
{id:35,base:"و",isolated:"ﻭ",final:"ﻮ",medial:"",initial:"",joinType:"R"},
{id:36,base:"ى",isolated:"ﻯ",final:"ﻰ",medial:"/",initial:"/",joinType:"R"},
{id:37,base:"ي",isolated:"ﻱ",final:"ﻲ",medial:"ﻴ",initial:"ﻳ",joinType:"D"},
{id:38,base:"ٱ",isolated:"ﭐ",final:"ﭑ",medial:"/",initial:"/",joinType:"R"},
{id:39,base:"ٲ",isolated:"ٲ",final:"ٲ",medial:"",initial:"",joinType:"R"},
{id:40,base:"ٳ",isolated:"ٳ",final:"ٳ",medial:"",initial:"",joinType:"R"},
{id:41,base:"ٴ",isolated:"ٴ",final:"",medial:"",initial:"",joinType:"R"},
{id:42,base:"ٵ",isolated:"ٵ",final:"ٵ",medial:"",initial:"",joinType:"R"},
{id:43,base:"ٶ",isolated:"ٶ",final:"ٶ",medial:"",initial:"",joinType:"R"},
{id:44,base:"ٷ",isolated:"ﯝ",final:"ٷ",medial:"",initial:"",joinType:"R"},
{id:45,base:"ٸ",isolated:"ٸ",final:"ٸ",medial:"ٸ",initial:"ٸ",joinType:"X"},
{id:46,base:"ٹ",isolated:"ﭦ",final:"ﭧ",medial:"ﭩ",initial:"ﭨ",joinType:"X"},
{id:47,base:"ٺ",isolated:"ﭞ",final:"ﭟ",medial:"ﭡ",initial:"ﭠ",joinType:"X"},
{id:48,base:"ٻ",isolated:"ﭒ",final:"ﭓ",medial:"ﭕ",initial:"ﭔ",joinType:"X"},
{id:49,base:"ټ",isolated:"ټ",final:"ټ",medial:"ټ",initial:"ټ",joinType:"X"},
{id:50,base:"ٽ",isolated:"ٽ",final:"ٽ",medial:"ٽ",initial:"ٽ",joinType:"X"},
{id:51,base:"پ",isolated:"ﭖ",final:"ﭗ",medial:"ﭙ",initial:"ﭘ",joinType:"D"},
{id:52,base:"ٿ",isolated:"ﭢ",final:"ﭣ",medial:"ﭥ",initial:"ﭤ",joinType:"X"},
{id:53,base:"ڀ",isolated:"ﭚ",final:"ﭛ",medial:"ﭝ",initial:"ﭜ",joinType:"X"},
{id:54,base:"ځ",isolated:"ځ",final:"ځ",medial:"ځ",initial:"ځ",joinType:"X"},
{id:55,base:"ڂ",isolated:"ڂ",final:"ڂ",medial:"ڂ",initial:"ڂ",joinType:"X"},
{id:56,base:"ڃ",isolated:"ﭶ",final:"ﭷ",medial:"ﭹ",initial:"ﭸ",joinType:"X"},
{id:57,base:"ڄ",isolated:"ﭲ",final:"ﭳ",medial:"ﭵ",initial:"ﭴ",joinType:"X"},
{id:58,base:"څ",isolated:"څ",final:"څ",medial:"څ",initial:"څ",joinType:"X"},
{id:59,base:"چ",isolated:"ﭺ",final:"ﭻ",medial:"ﭽ",initial:"ﭼ",joinType:"D"},
{id:60,base:"ڇ",isolated:"ﭾ",final:"ﭿ",medial:"ﮁ",initial:"ﮀ",joinType:"X"},
{id:61,base:"ڈ",isolated:"ﮈ",final:"ﮉ",medial:"",initial:"",joinType:"R"},
{id:62,base:"ډ",isolated:"ډ",final:"ډ",medial:"",initial:"",joinType:"R"},
{id:63,base:"ڊ",isolated:"ڊ",final:"ڊ",medial:"",initial:"",joinType:"R"},
{id:64,base:"ڋ",isolated:"ڋ",final:"ڋ",medial:"",initial:"",joinType:"R"},
{id:65,base:"ڌ",isolated:"ﮄ",final:"ﮅ",medial:"",initial:"",joinType:"R"},
{id:66,base:"ڍ",isolated:"ﮂ",final:"ﮃ",medial:"",initial:"",joinType:"R"},
{id:67,base:"ڎ",isolated:"ﮆ",final:"ﮇ",medial:"",initial:"",joinType:"R"},
{id:68,base:"ڏ",isolated:"ڏ",final:"ڏ",medial:"",initial:"",joinType:"R"},
{id:69,base:"ڐ",isolated:"ڐ",final:"ڐ",medial:"",initial:"",joinType:"R"},
{id:70,base:"ڑ",isolated:"ﮌ",final:"ﮍ",medial:"",initial:"",joinType:"R"},
{id:71,base:"ڒ",isolated:"ڒ",final:"ڒ",medial:"",initial:"",joinType:"R"},
{id:72,base:"ړ",isolated:"ړ",final:"ړ",medial:"",initial:"",joinType:"R"},
{id:73,base:"ڔ",isolated:"ڔ",final:"ڔ",medial:"",initial:"",joinType:"R"},
{id:74,base:"ڕ",isolated:"ڕ",final:"ڕ",medial:"",initial:"",joinType:"R"},
{id:75,base:"ږ",isolated:"ڕ",final:"ږ",medial:"",initial:"",joinType:"R"},
{id:76,base:"ڗ",isolated:"ڗ",final:"ڗ",medial:"",initial:"",joinType:"R"},
{id:77,base:"ژ",isolated:"ﮊ",final:"ﮋ",medial:"",initial:"",joinType:"R"},
{id:78,base:"ڙ",isolated:"ڙ",final:"ڙ",medial:"",initial:"",joinType:"R"},
{id:79,base:"ښ",isolated:"ښ",final:"ښ",medial:"ښ",initial:"ښ",joinType:"X"},
{id:80,base:"ڛ",isolated:"ڛ",final:"ڛ",medial:"ڛ",initial:"ڛ",joinType:"X"},
{id:81,base:"ڜ",isolated:"ڜ",final:"ڜ",medial:"ڜ",initial:"ڜ",joinType:"X"},
{id:82,base:"ڝ",isolated:"ڝ",final:"ڝ",medial:"ڝ",initial:"ڝ",joinType:"X"},
{id:83,base:"ڞ",isolated:"ڞ",final:"ڞ",medial:"ڞ",initial:"ڞ",joinType:"X"},
{id:84,base:"ڟ",isolated:"ڟ",final:"ڟ",medial:"ڟ",initial:"ڟ",joinType:"X"},
{id:85,base:"ڠ",isolated:"ڠ",final:"ڠ",medial:"ڠ",initial:"ڠ",joinType:"X"},
{id:86,base:"ڡ",isolated:"ڡ",final:"ڡ",medial:"ڡ",initial:"ڡ",joinType:"X"},
{id:87,base:"ڢ",isolated:"ڢ",final:"ڢ",medial:"ڢ",initial:"ڢ",joinType:"X"},
{id:88,base:"ڣ",isolated:"ڣ",final:"ڣ",medial:"ڣ",initial:"ڣ",joinType:"X"},
{id:89,base:"ڤ",isolated:"ﭪ",final:"ﭫ",medial:"ﭭ",initial:"ﭬ",joinType:"D"},
{id:90,base:"ڥ",isolated:"ڥ",final:"ڥ",medial:"ڥ",initial:"ڥ",joinType:"X"},
{id:91,base:"ڦ",isolated:"ﭮ",final:"ﭯ",medial:"ﭱ",initial:"ﭰ",joinType:"X"},
{id:92,base:"ڧ",isolated:"ڧ",final:"ڧ",medial:"ڧ",initial:"ڧ",joinType:"X"},
{id:93,base:"ڨ",isolated:"ڨ",final:"ڨ",medial:"ڨ",initial:"ڨ",joinType:"X"},
{id:94,base:"ک",isolated:"ﮎ",final:"ﮏ",medial:"ﮑ",initial:"ﮐ",joinType:"D"},
{id:95,base:"ڪ",isolated:"ڪ",final:"ڪ",medial:"ڪ",initial:"ڪ",joinType:"X"},
{id:96,base:"ګ",isolated:"ګ",final:"ګ",medial:"ګ",initial:"ګ",joinType:"X"},
{id:97,base:"ڬ",isolated:"ڬ",final:"ڬ",medial:"ڬ",initial:"ڬ",joinType:"X"},
{id:98,base:"ڭ",isolated:"ﯓ",final:"ﯔ",medial:"ﯖ",initial:"ﯕ",joinType:"X"},
{id:99,base:"ڮ",isolated:"ڮ",final:"ڮ",medial:"ڮ",initial:"ڮ",joinType:"X"},
{id:100,base:"گ",isolated:"ﮒ",final:"ﮓ",medial:"ﮕ",initial:"ﮔ",joinType:"X"},
{id:101,base:"ڰ",isolated:"ڰ",final:"ڰ",medial:"ڰ",initial:"ڰ",joinType:"X"},
{id:102,base:"ڱ",isolated:"ﮚ",final:"ﮛ",medial:"ﮝ",initial:"ﮜ",joinType:"X"},
{id:103,base:"ڲ",isolated:"ڲ",final:"ڲ",medial:"ڲ",initial:"ڲ",joinType:"X"},
{id:104,base:"ڳ",isolated:"ﮖ",final:"ﮗ",medial:"ﮙ",initial:"ﮘ",joinType:"X"},
{id:105,base:"ڴ",isolated:"ڴ",final:"ڴ",medial:"ڴ",initial:"ڴ",joinType:"X"},
{id:106,base:"ڵ",isolated:"ڵ",final:"ڵ",medial:"ڵ",initial:"ڵ",joinType:"X"},
{id:107,base:"ڶ",isolated:"ڶ",final:"ڶ",medial:"ڶ",initial:"ڶ",joinType:"X"},
{id:108,base:"ڷ",isolated:"ڷ",final:"ڷ",medial:"ڷ",initial:"ڷ",joinType:"X"},
{id:109,base:"ں",isolated:"ﮞ",final:"ﮟ",medial:"ں",initial:"ں",joinType:"X"},
{id:110,base:"ڻ",isolated:"ﮠ",final:"ﮡ",medial:"ﮣ",initial:"ﮢ",joinType:"X"},
{id:111,base:"ڼ",isolated:"ڼ",final:"ڼ",medial:"ڼ",initial:"ڼ",joinType:"X"},
{id:112,base:"ڽ",isolated:"ڽ",final:"ڽ",medial:"ڽ",initial:"ڽ",joinType:"X"},
{id:113,base:"ھ",isolated:"ﮪ",final:"ﮫ",medial:"ﮭ",initial:"ﮬ",joinType:"X"},
{id:114,base:"ۀ",isolated:"ﮤ",final:"ﮥ",medial:"",initial:"",joinType:"X"},
{id:115,base:"ہ",isolated:"ﮦ",final:"ﮧ",medial:"ﮩ",initial:"ﮨ",joinType:"X"},
{id:116,base:"ۂ",isolated:"ۂ",final:"ۂ",medial:"",initial:"",joinType:"X"},
{id:117,base:"ۃ",isolated:"ۃ",final:"ۃ",medial:"",initial:"",joinType:"X"},
{id:118,base:"ۄ",isolated:"ۄ",final:"ۄ",medial:"",initial:"",joinType:"X"},
{id:119,base:"ۅ",isolated:"ﯠ",final:"ﯡ",medial:"",initial:"",joinType:"X"},
{id:120,base:"ۆ",isolated:"ﯙ",final:"ﯚ",medial:"",initial:"",joinType:"X"},
{id:121,base:"ۇ",isolated:"ﯗ",final:"ﯘ",medial:"",initial:"",joinType:"X"},
{id:122,base:"ۈ",isolated:"ﯛ",final:"ﯜ",medial:"",initial:"",joinType:"X"},
{id:123,base:"ۉ",isolated:"ﯢ",final:"ﯣ",medial:"",initial:"",joinType:"X"},
{id:124,base:"ۊ",isolated:"ۊ",final:"ۊ",medial:"",initial:"",joinType:"X"},
{id:125,base:"ۋ",isolated:"ﯞ",final:"ﯟ",medial:"",initial:"",joinType:"X"},
{id:126,base:"ی",isolated:"ﯼ",final:"ﯽ",medial:"ﯿ",initial:"ﯾ",joinType:"D"},
{id:127,base:"ۍ",isolated:"ۍ",final:"ۍ",medial:"",initial:"",joinType:"X"},
{id:128,base:"ێ",isolated:"ێ",final:"ێ",medial:"ێ",initial:"ێ",joinType:"X"},
{id:129,base:"ې",isolated:"ﯤ",final:"ﯥ",medial:"ﯧ",initial:"ﯦ",joinType:"X"},
{id:130,base:"ہ",isolated:"ہ",final:"ہ",medial:"ہ",initial:"ہ",joinType:"X"},
{id:131,base:"ۂ",isolated:"ۂ",final:"ۂ",medial:"",initial:"",joinType:"R"},
{id:132,base:"ۃ",isolated:"ۃ",final:"ۃ",medial:"",initial:"",joinType:"R"},
{id:133,base:"ۄ",isolated:"ۄ",final:"ۄ",medial:"",initial:"",joinType:"R"},
{id:134,base:"ۅ",isolated:"ۅ",final:"ۅ",medial:"",initial:"",joinType:"R"},
{id:135,base:"ۆ",isolated:"ۆ",final:"ۆ",medial:"",initial:"",joinType:"R"},
{id:136,base:"ۇ",isolated:"ۇ",final:"ۇ",medial:"",initial:"",joinType:"R"},
{id:137,base:"ۈ",isolated:"ۈ",final:"ۈ",medial:"",initial:"",joinType:"R"},
{id:138,base:"ۉ",isolated:"ۉ",final:"ۉ",medial:"",initial:"",joinType:"R"},
{id:139,base:"ۊ",isolated:"ۊ",final:"ۊ",medial:"",initial:"",joinType:"R"},
{id:140,base:"ۋ",isolated:"ۋ",final:"ۋ",medial:"",initial:"",joinType:"R"},
{id:141,base:"ی",isolated:"ی",final:"ی",medial:"ی",initial:"ی",joinType:"X"},
{id:142,base:"ۍ",isolated:"ۍ",final:"ۍ",medial:"",initial:"",joinType:"R"},
{id:143,base:"ێ",isolated:"ێ",final:"ێ",medial:"ێ",initial:"ێ",joinType:"X"},
{id:144,base:"ې",isolated:"ې",final:"ې",medial:"ې",initial:"ې",joinType:"X"},
{id:145,base:"ۑ",isolated:"ۑ",final:"ۑ",medial:"ۑ",initial:"ۑ",joinType:"X"},
{id:146,base:"ے",isolated:"ﮮ",final:"ﮯ",medial:"",initial:"",joinType:"R"},
{id:147,base:"ۓ",isolated:"ﮰ",final:"ﮱ",medial:"",initial:"",joinType:"R"},
{id:148,base:"ە",isolated:"ە",final:"",medial:"",initial:"",joinType:"R"},
{id:149,base:"",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:150,base:"ً",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:151,base:"ٌ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:152,base:"ٍ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:153,base:"َ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:154,base:"ُ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:155,base:"ِ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:156,base:"ٰ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:157,base:"ۗ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:158,base:"ۘ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:159,base:"ۙ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:160,base:"ۚ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:161,base:"ۛ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:162,base:"ۜ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:163,base:"۟",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:164,base:"۠",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:165,base:"ۡ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:166,base:"ۢ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:167,base:"ۣ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:168,base:"ۤ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:169,base:"ۧ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:170,base:"ۨ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:171,base:"۪",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:172,base:"۫",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:173,base:"۬",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:174,base:"ۭ",isolated:"",final:"",medial:"",initial:"",joinType:"T"},
{id:175,base:"ْ",isolated:"ْ",final:"",medial:"",initial:"",joinType:"T"},
{id:176,base:"ّ",isolated:"ّ",final:"",medial:"",initial:"",joinType:"T"},
{id:177,base:" ",isolated:" ",final:"",medial:"",initial:"",joinType:"U"}];


var arabicLigatures:Array = [{id:1,base:"ﺂﻟ",ligature:"ﻵ"},
{id:2,base:"ﺂﻠ",ligature:"ﻶ"},
{id:3,base:"ﺄﻟ",ligature:"ﻷ"},
{id:4,base:"ﺄﻠ",ligature:"ﻸ"},
{id:5,base:"ﺈﻟ",ligature:"ﻹ"},
{id:6,base:"ﺈﻠ",ligature:"ﻺ"},
{id:7,base:"ﺎﻟ",ligature:"ﻻ"},
{id:8,base:"ﺎﻠ",ligature:"ﻼ"},
{id:9,base:"ٌّ",ligature:"ﱞ"},
{id:10,base:"ٍّ",ligature:"ﱟ"},
{id:11,base:"َّ",ligature:"ﱠ"},
{id:12,base:"ُّ",ligature:"ﱡ"},
{id:13,base:"ِّ",ligature:"ﱢ"}];/*,
{id:14,base:"ﻢﺗ",ligature:"ﰎ"},
{id:15,base:"ﻲﻓ",ligature:"ﰲ"},
{id:16,base:"ﺞﻟ",ligature:"ﰿ"},
{id:17,base:"ﺢﻟ",ligature:"ﱀ"},
{id:18,base:"ﺦﻟ",ligature:"ﱁ"},
{id:19,base:"ﻢﻟ",ligature:"ﱂ"},
{id:20,base:"ﻰﻟ",ligature:"ﱃ"},
{id:21,base:"ﻲﻟ",ligature:"ﱄ"},
{id:22,base:"ﻢﻧ",ligature:"ﱎ"},
{id:23,base:"ﺮﺒ",ligature:"ﱪ"},
{id:24,base:"ﻦﺒ",ligature:"ﱭ"},
{id:25,base:"ﻲﺒ",ligature:"ﱯ"},
{id:26,base:"ﺮﺘ",ligature:"ﱰ"},
{id:27,base:"ﻦﺘ",ligature:"ﱳ"},
{id:28,base:"ﻲﺘ",ligature:"ﱵ"},
{id:29,base:"ﻲﻨ",ligature:"ﲏ"},
{id:30,base:"ﺮﻴ",ligature:"ﲑ"},
{id:31,base:"ﻦﻴ",ligature:"ﲔ"},
{id:32,base:"ﺠﺑ",ligature:"ﲜ"},
{id:33,base:"ﺤﺑ",ligature:"ﲝ"},
{id:34,base:"ﺨﺑ",ligature:"ﲞ"},
{id:35,base:"ﻤﺑ",ligature:"ﲟ"},
{id:36,base:"ﺠﺗ",ligature:"ﲡ"},
{id:37,base:"ﺤﺗ",ligature:"ﲢ"},
{id:38,base:"ﺨﺗ",ligature:"ﲣ"},
{id:39,base:"ﻤﺗ",ligature:"ﲤ"},
{id:40,base:"ﻤﺛ",ligature:"ﲦ"},
{id:41,base:"ﻤﺟ",ligature:"ﲨ"},
{id:42,base:"ﻤﺣ",ligature:"ﲪ"},
{id:43,base:"ﻤﺧ",ligature:"ﲬ"},
{id:44,base:"ﻤﺳ",ligature:"ﲰ"},
{id:45,base:"ﺠﻟ",ligature:"ﳉ"},
{id:46,base:"ﺤﻟ",ligature:"ﳊ"},
{id:47,base:"ﺨﻟ",ligature:"ﳋ"},
{id:48,base:"ﻤﻟ",ligature:"ﳌ"},
{id:49,base:"ﻬﻟ",ligature:"ﳍ"},
{id:50,base:"ﺠﻣ",ligature:"ﳎ"},
{id:51,base:"ﺤﻣ",ligature:"ﳏ"},
{id:52,base:"ﺨﻣ",ligature:"ﳐ"},
{id:53,base:"ﻤﻣ",ligature:"ﳑ"},
{id:54,base:"ﺠﻧ",ligature:"ﳒ"},
{id:55,base:"ﺤﻧ",ligature:"ﳓ"},
{id:56,base:"ﺨﻧ",ligature:"ﳔ"},
{id:57,base:"ﻤﻧ",ligature:"ﳕ"},
{id:58,base:"ﺠﻳ",ligature:"ﳚ"},
{id:59,base:"ﺤﻳ",ligature:"ﳛ"},
{id:60,base:"ﺨﻳ",ligature:"ﳜ"},
{id:61,base:"ﻤﻳ",ligature:"ﳝ"},
{id:62,base:"ﺤﻤﻟ",ligature:"ﶈ"},
{id:63,base:"ﻪﻠﻟﺍ",ligature:"ﷲ"},
{id:64,base:"ﻢﻠﺳﻭ",ligature:"ﻪﻴﻠﻋ"},
{id:65,base:"ﻪﻟﺎﻠﺟ",ligature:"ﻞﺟ"}]*/

function getPresentationFormString(theWord:String){
	newWord = "";
	prevType = "U" // this is for first case
	nextLetter = "";
	var wordLength = theWord.length;
	var j = 0;
	var i = 0;
	var transparentString = "";
	trace("wordLength: " + wordLength);
	while(i< wordLength){
		currentLetter = theWord.charAt(i);
		currentType = getJoinType(currentLetter); //get type of first character
		nextType = "U"; // this is for the last case
		i++;
		j = i;
		transparentString = "";
		while(j<wordLength){
			trace("j is: " + j);
			nextLetter = theWord.charAt(j);
			nextType = getJoinType(nextLetter);  //get type of second character
			if(nextType != "T"){
				break;
			}
			nextType = "U";
			trace("Checking for trans. ligature: " + transparentString.length);
			if((transparentString.length) > 0){ //this if statement gets transparent ligatures
				tempString = transparentString.charAt(transparentString.length - 1);
				trace("Checking for trans. ligature now: ");
				tempString = nextLetter + tempString;
				tempLigature = getLigaturePresentationForm(tempString);
				if(tempLigature != ""){
					trace("Found ligature: " + tempLigature);
					trace("Ligature size: " + tempLigature.length);
					transparentString = transparentString.substring(0, transparentString.length - 1)
					nextLetter = tempLigature;
				}
			}
			transparentString = transparentString + nextLetter;
			j++;
		}
		if(currentType == "D"){ //need to check both sides
			if(prevType == "D"){ // currentType has to be either medial or final
				if(nextType == "R" || nextType == "D"){
					newLetter = getMedialPresentationForm(currentLetter);
				}
				else{ // this catches nonJoining letters
					newLetter = getFinalPresentationForm(currentLetter);
				}
			}
			else { //this catches U and R previous letters, so the letter must be either initial or isolated
				if(nextType == "R" || nextType == "D"){
					newLetter = getInitialPresentationForm(currentLetter);
				}
				else {
					newLetter = getIsolatedPresentationForm(currentLetter);
				}
			}
		}
		else if (currentType == "R") { //need to only check previousType
			if(prevType == "D"){
				newLetter = getFinalPresentationForm(currentLetter);
			}
			else {
				newLetter = getIsolatedPresentationForm(currentLetter);
			}
		}
		else { //this is for all isolated forms
			newLetter = getIsolatedPresentationForm(currentLetter);
		}
		tempString = "";
		if((newWord.length) > 0){ //this if statement gets letter ligatures
				tempString = newWord.charAt(newWord.length - 1);
				tempString = newLetter + tempString;
				tempLigature = getLigaturePresentationForm(tempString);
				if(tempLigature != ""){
						newWord = newWord.substring(0, newWord.length - 1)
						newLetter = tempLigature;
						//ligature always gets currentType.
				}
			}
		newWord = newWord + transparentString;
		newWord = newWord + newLetter;
		prevType = currentType;
		i = j;
	}
	return newWord;
}

function getJoinType(theChar:String):String{
	arabicUnicode_ds.find([theChar]);
	return arabicUnicode_ds.currentItem.joinType;
}

function getIsolatedPresentationForm(theChar:String):String{
	arabicUnicode_ds.find([theChar]);
	return arabicUnicode_ds.currentItem.isolated;
}

function getInitialPresentationForm(theChar:String):String{
	arabicUnicode_ds.find([theChar]);
	return arabicUnicode_ds.currentItem.initial;
}

function getMedialPresentationForm(theChar:String):String{
	arabicUnicode_ds.find([theChar]);
	return arabicUnicode_ds.currentItem.medial;
}

function getFinalPresentationForm(theChar:String):String{
	arabicUnicode_ds.find([theChar]);
	return arabicUnicode_ds.currentItem.final;
}

function revString( str ):String{
	var newString:String = ""
	for(var i =(str.length-1); i>=0;i--){
		newString = newString + str.charAt(i);
		trace("updated String: " + newString);
	}
	var tempString:String = str.split("").reverse().join("");
	return tempString;
}

function getLigaturePresentationForm(theChar:String):String{
	if(arabicLigatures_ds.find([theChar])){
		return arabicLigatures_ds.currentItem.ligature;
	}
	else {
		return "";
	}
}