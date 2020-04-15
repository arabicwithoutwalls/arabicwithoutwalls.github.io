// Basic code to unhide/show/toggle visibility of any span tag with the given class name.
//
// ie:
//
// 	<span class="showmelater" style="visibility: hidden">Blah</span>
//
// Will be shown by showMe('showmelater') or showhideMe('showmelater').
//
// Written by Mike Jumper.

function showMe(classname_to_show) {

	var elements = document.getElementsByTagName('span');
	var i=0;
	while (elements[i] != null) {
		if (elements[i].className == classname_to_show)
			elements[i].style.visibility = 'visible';
		i++;
	}

}

function hideMe(classname_to_hide) {

	var elements = document.getElementsByTagName('span');
	var i=0;
	while (elements[i] != null) {
		if (elements[i].className == classname_to_hide)
			elements[i].style.visibility = 'hidden';
		i++;
	}

}

// Toggles
function showhideMe(classname_to_toggle) {

	var elements = document.getElementsByTagName('span');
	var i=0;
	while (elements[i] != null) {
		if (elements[i].className == classname_to_toggle) {
			if (elements[i].style.visibility == 'visible')
				elements[i].style.visibility = 'hidden';
			else
				elements[i].style.visibility = 'visible';
		}
		i++;
	}

}
