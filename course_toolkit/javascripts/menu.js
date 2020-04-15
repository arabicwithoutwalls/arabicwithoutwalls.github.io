// Google Analytics Tracking code
/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-812982-29', 'ucdavis.edu');
ga('send', 'pageview');
*/
// An AJAX-like behind-the-scenes file getter.
// Takes in a URL.
function get_file(url) {
  // Shameless learned at http://www.expertsrt.com/tutorials/Rod/JSread.php //
  // This function will create an asyncronous object to go get the menu definition file.
  // Notive the postFileReady function gets called when the object changes "Ready State".
  var getFile = function getFile(url) {
     if (navigator.appName == 'Microsoft Internet Explorer') {
        xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
        if (xmlhttp) {
           xmlhttp.onreadystatechange=postFileReady;
           xmlhttp.open('GET', url, true);
           xmlhttp.send();
        }
     }
     else { // code for Mozilla, Safari, etc
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=postFileReady;
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
     } 
  }


  // function to handle asynchronous call
  // This just takes the text in the menu definition file and passes it to the formatting function.
  var postFileReady = function postFileReady() {
     if (xmlhttp.readyState==4) {
       format_menu(xmlhttp.responseText);
       xmlRequest = null;
     }
  }



// This will go through the menu definition line-by-line.
// should be inside the function above.
var format_menu = function format_menu(menu_string) {
  // Split by lines.
  var lines = menu_string.split(/[\r\n]+/);
  // This is our output string. We'll build it as we go.
  menu_string = "";
  // If there are no tabs in a line, it will return -1, so we have to start with -2.
  var previous_number_of_tabs = -2;
  // Loop through each line.
  for (i=0;i<lines.length;i++) {
    // Count tabs in this line by looking for the position of the last tab.
    number_of_tabs = lines[i].lastIndexOf("\t");
    // If there is a next line, count how many tabs it has too.
    if ((i+1) < lines.length) {
      next_number_of_tabs = lines[i+1].lastIndexOf("\t");
    }
    // If this is the first line, put an id in the <ul>.
    if (previous_number_of_tabs == -2) {
      menu_string = menu_string + "\r\n" + '<ul id="menu">';
      // Record the current number of tabs as the previous one (because it will be when we loop).
      previous_number_of_tabs = number_of_tabs;      
    }
    // If tabs are more in this line than in the previous, we have found a child, put in <ul>.
    else if (number_of_tabs > previous_number_of_tabs) {
      menu_string = menu_string + "\r\n" + '<ul>';
      // Record the current number of tabs as the previous one (because it will be when we loop).
      previous_number_of_tabs = number_of_tabs;
    }
    // If current tabs are less than previous, we've finished the children, put as many </ul> as we need.
    else if (number_of_tabs < previous_number_of_tabs) {
      for (j=0;j<(previous_number_of_tabs-number_of_tabs);j++) {
        menu_string = menu_string + "\r\n</ul>\r\n</li>";
      }
      // Record the current number of tabs as the previous one (because it will be when we loop).
      previous_number_of_tabs = number_of_tabs;
    }
    // If tabs are the same...
    // .. uh, do nothing ..
    // If this line has children, put in some arrows. FYI: &#187; is the unicode for the right French quotes >>.
    if (next_number_of_tabs > number_of_tabs) {
      arrows = "&#187;";
    }
    else {
      arrows = "";
    }
    // If the menu items are links, the url will follow the text with ' ## ' between.
    // If there is a ' ## ' in the line...
    if (lines[i].indexOf(' ## ') > -1) {
      // Split the line by the ' ## '.
      link_array = lines[i].split(' ## ');
    }
    // If there is no link (no ' ## ') in the line...
    else {
      // Create the same link array, but populate it manually.
      link_array = new Array();
      link_array[0] = lines[i];
      link_array[1] = "#";
    }
    // Write the line to the output string.
    menu_string = menu_string + "\r\n<li>" + '<a href="' + link_array[1] + '">' + link_array[0] + " " + arrows + "</a>";
    //menu_string = menu_string + "\r\n<li onmouseover=\"var child = this.getElementsByTagName('ul')[0]; if (child != null) child.style.display = 'block'; this.style.background='#768CAD'\" onmouseout=\"var child = this.getElementsByTagName('ul')[0]; if (child != null) child.style.display = 'none'; this.style.background='#F8B80F'\">" + '<a href="' + link_array[1] + '">' + link_array[0] + " " + arrows + "</a>";
    // It's important that child <ol>s be within the parent's <li></li>.
    // So, we'll only write </li> when we know there are no more children (or the line has no children).
    if (next_number_of_tabs <= number_of_tabs) {
      menu_string = menu_string + "</li>";
    }
  }
  // Put the output into the MENU div.
  document.getElementById('abdmenu').innerHTML = "" + menu_string + "</ul>";

} // End format_menu()





 
  getFile(url);

}  // End get_file();


function show_menu() {
  //get_file('toolkit/menudefinition.txt');
  get_file('chapter_toolkit/menudefinition.txt');
}

function hideULChildren() {
}

function showULChildren(foo) {
	alert(foo.onclick);
	var uls = this.getElementsByTagName('ul');
	var i=0;
	while (uls[i] != null) {
		alert("Showing...");
		uls[i].style.display = 'block'
		i++;
	}
}

