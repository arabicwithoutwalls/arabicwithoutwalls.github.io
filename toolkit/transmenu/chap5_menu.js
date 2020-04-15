// JavaScript Document

<!--
function init() {
			//==========================================================================================
			// if supported, initialize TransMenus
			//==========================================================================================
			// Check isSupported() so that menus aren't accidentally sent to non-supporting browsers.
			// This is better than server-side checking because it will also catch browsers which would
			// normally support the menus but have javascript disabled.
			//
			// If supported, call initialize() and then hook whatever image rollover code you need to do
			// to the .onactivate and .ondeactivate events for each menu.
			//==========================================================================================
			if (TransMenu.isSupported()) {
				TransMenu.initialize();

				// hook all the highlight swapping of the main toolbar to menu activation/deactivation
				// instead of simple rollover to get the effect where the button stays hightlit until
				// the menu is closed.
				
				menu1.onactivate = function() { document.getElementById("alkitaab").className = "hover"; };
				menu1.ondeactivate = function() { document.getElementById("alkitaab").className = ""; };

				menu2.onactivate = function() { document.getElementById("interviews").className = "hover"; };
				menu2.ondeactivate = function() { document.getElementById("interviews").className = ""; };

				menu3.onactivate = function() { document.getElementById("culture").className = "hover"; };
				menu3.ondeactivate = function() { document.getElementById("culture").className = ""; };
			}
		}

	// set up drop downs anywhere in the body of the page. I think the bottom of the page is better.. 
	// but you can experiment with effect on loadtime.
	if (TransMenu.isSupported()) {

		//==================================================================================================
		// create a set of dropdowns
		//==================================================================================================
		// the first param should always be down, as it is here
		//
		// The second and third param are the top and left offset positions of the menus from their actuators
		// respectively. To make a menu appear a little to the left and bottom of an actuator, you could use
		// something like -5, 5
		//
		// The last parameter can be .topLeft, .bottomLeft, .topRight, or .bottomRight to inidicate the corner
		// of the actuator from which to measure the offset positions above. Here we are saying we want the 
		// menu to appear directly below the bottom left corner of the actuator
		//==================================================================================================
		var ms = new TransMenuSet(TransMenu.direction.right, 152, 0, TransMenu.reference.bottomleft);

		//==================================================================================================
		// create a dropdown menu
		//==================================================================================================
		// the first parameter should be the HTML element which will act actuator for the menu
		//==================================================================================================
		var menu1 = ms.addMenu(document.getElementById("alkitaab"));
		menu1.addItem("Vocabulary", "");
		menu1.addItem("Video", "");
		menu1.addItem("Grammar", "");
		menu1.addItem("Pronunciation Tips", "");
		menu1.addItem("Reading", "");
		menu1.addItem("Chat", "");
		menu1.addItem("Writing", "");
		menu1.addItem("Quizes", "");

		var submenu0 = menu1.addMenu(menu1.items[0]);
		submenu0.addItem("Vocabulary Exercise 1", "/aww/chapter5/vocab_ex1.html");
		submenu0.addItem("Vocabulary Exercise 2", "/aww/chapter5/vocab_ex2.html");
		//submenu0.addItem("Writing Exercise", "/aww/chapter5/writing_ex1.html");
		
		var submenu1 = menu1.addMenu(menu1.items[1]);
		submenu1.addItem("Video Exercise 1", "/aww/chapter5/ch5_video_ex1/");
		
		var submenu2 = menu1.addMenu(menu1.items[2]);
		submenu2.addItem("Noun/Adjective Exercise 1", "/aww/chapter5/noun_adj_ex1.html");
		submenu2.addItem("Noun/Adjective Exercise 2", "/aww/chapter5/noun_adj_ex2.html");
		submenu2.addItem("Noun/Adjective Exercise 3", "/aww/chapter5/noun_adj_ex3.html");
		submenu2.addItem("Grammatical Note: Idaafa", "/aww/chapter5/grammar_idaafa.html");
		submenu2.addItem("Idaafa-Adjective Exercise", "/aww/chapter5/idaafa_adj_ex.html");
		submenu2.addItem("Grammatical Note: Demonstrative", "/aww/chapter5/grammar_demonstrative.html");
		submenu2.addItem("Demonstrative Exercise", "/aww/chapter5/demonstrative_ex.html");
		
		var submenu1 = menu1.addMenu(menu1.items[3]);
		submenu1.addItem("Pronunciation Tip", "/aww/chapter5/pronunciation.html");

		var submenu4 = menu1.addMenu(menu1.items[4]);
		submenu4.addItem("Internet Meteorology Reading Exercise", "/aww/chapter5/reading_ex.html");
		
		var submenu5 = menu1.addMenu(menu1.items[5]);
		submenu5.addItem("Chat exercise 1", "/aww/chapter5/chat_ex1.html");
		submenu5.addItem("Chat exercise 2", "/aww/chapter5/chat_ex2.html");

		var submenu6 = menu1.addMenu(menu1.items[6]);
		submenu6.addItem("Writing Exercise 1", "/aww/chapter5/writing_ex1.html");
		submenu6.addItem("Writing Exercise 2", "/aww/chapter5/writing_ex2.html");
			
/*
    var submenu00 = submenu0.addMenu(submenu0.items[0]);
    submenu00.addItem("foo");
    submenu00.addItem("bar");
*/	
		//==================================================================================================

		//==================================================================================================
		var menu2 = ms.addMenu(document.getElementById("interviews"));
		menu2.addItem("Interview Exercise to come", "");
		menu2.addItem("and another... ", "#");

		var submenu0 = menu2.addMenu(menu2.items[0]);
		submenu0.addItem("sample content here", "");
		submenu0.addItem("more sample content", "");
		submenu0.addItem("and more", "");

		//==================================================================================================

		//==================================================================================================
		var menu3 = ms.addMenu(document.getElementById("culture"));
		menu3.addItem("Did You Know?", "/aww/chapter5/didyouknow.html");
		menu3.addItem("Vocabulary Glossary", "/aww/chapter5/cult_glossary.html");
		menu3.addItem("Reading, Map 1", "/aww/chapter5/map_ex1.html");
		menu3.addItem("Reading, Map 2", "/aww/chapter5/map_ex2.html");

/*
		var submenu2 = menu3.addMenu(menu3.items[0]);
		var submenu3 = menu3.addMenu(menu3.items[1]);

		submenu2.addItem("Hostel", "");
		submenu2.addItem("Piazza Erba", "");
		submenu2.addItem("Castle", "");
		submenu2.addItem("Arena", "");

		submenu3.addItem("Piazza San Marco", "");
		submenu3.addItem("Lagoon", "");
		submenu3.addItem("Hotel", "");
		submenu3.addItem("Chichetti", "");
		submenu3.addItem("Doge's Palace", "");
*/
		//==================================================================================================

		//==================================================================================================
		// write drop downs into page
		//==================================================================================================
		// this method writes all the HTML for the menus into the page with document.write(). It must be
		// called within the body of the HTML page.
		//==================================================================================================
		TransMenu.renderAll();
	}