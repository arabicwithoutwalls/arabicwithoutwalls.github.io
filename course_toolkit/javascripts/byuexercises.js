// site library ActionScript Document

<!--
/* A basic script that checks HTML form fields and gives simple right/wrong feedback. */

/*********************************

checkAnswers() reads the values of each form element
and then sets the value of the associated feedback
image to that value (either right, wrong, or blank.gif

It takes a form object as an arguement. The easy way 
to do this is in a button:
<input type="button" value="Check Answers" onclick="checkAnswers(this.form);">

WORKS WITH:
Text fields
  Just name the field the correct answer

drop-down menus
  Give each option a value of right, wrong, or black

radio buttons
  Make sure that each button has its own image. Set 
  input's value to right or wrong.

checkboxes
  The checkbox must have a value of right or wrong.
  Right means that it should be checked, wrong
  means it should not.

*********************************/

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName]
    }
    else {
        return document[movieName]
    }
}

function getText(){
	var myObject;
	if(navigator.appName.indexOf("Microsoft") != -1) {
      myObject = window.document.getElementById("theAnswer");
    }else {
      myObject = document.getElementById("theAnswer");
    }
	return myObject.value;
}

function eraseText(){
	var myObject;
	if(navigator.appName.indexOf("Microsoft") != -1) {
      myObject = window.document.getElementById("theAnswer");
    }else {
      myObject = document.getElementById("theAnswer");
    }
	myObject.value = "";
	myObject.focus();
	return "True";
}

function setFocus(){
	var myObject;
	if(navigator.appName.indexOf("Microsoft") != -1) {
      myObject = window.document.getElementById("theAnswer");
    }else {
      myObject = document.getElementById("theAnswer");
    }
	myObject.focus();
}

function updateCounter(str){
	var myObject;
	if(navigator.appName.indexOf("Microsoft") != -1) {
      myObject = window["flashCounter"];
    }else {
      myObject = document["flashCounter"];
    }
	myObject.callUpdateCounter(str);
}

// Replaced old checkAnswers with the new fixed checkAnswers that supports multiple
// excercises on one page. The old one was fixed a while ago, but the new course-wide
// toolkit had the old broken version for some reason.
//
function checkAnswers(thisForm) {

  // i is a counter for our loops
  var i = 0;
  var numProblems = 0;

  // Feed the activity's feedback images into an array
  imagesArray = new Array();
  var formImages = thisForm.getElementsByTagName("img");

  // Loop through all images on the page
  while (formImages[i] != null) {

    // if the image source contains blank.gif, right.gif, or wrong.gif
    if (formImages[i].src.indexOf("blank.gif") >= 0 || formImages[i].src.indexOf("right.gif") >= 0 || formImages[i].src.indexOf("wrong.gif") >= 0) {

      // Put that object in the array
      imagesArray[imagesArray.length] = formImages[i];
      numProblems++;

    }
    i++;

  } // End looping through document's images
 


  // Feed the applicable form elements into an array.
  elementsArray = new Array();
  // Loop through all images on the page
  i = 0;
  var correctAnswers = 0;
  while (thisForm.elements[i] != null) {

    // if the image source contains blank.gif, right.gif, or wrong.gif
    if (thisForm.elements[i].type != undefined) {

      // Put that element in the array
      elementsArray[elementsArray.length] = thisForm.elements[i];

    }
    i++;

  } // End looping through document's images

  // reset the counter
  i = 0;

  // This will loop through all of the form's elements.
  // We use i+1 so that we will not loop for the last 
  // element which is the check answers button.
  while (elementsArray[i+1] != null) {

    // Uncomment this next line to view the type of the current element.
    //alert (elementsArray[i].type);

    // Split for each type of form element
    switch (elementsArray[i].type) {

      // For text fields
      case "text" : 

        // Text fields named "!Skip this field!" will be ignored.
        if (elementsArray[i].name != "!Skip this field!") {
        
          // If the field is blank...
          if (elementsArray[i].value == "") {
			
            // ...display blank.gif
            imagesArray[i].src = "../images/blank.gif";
          }
	    // If the text the user put into the field
          // is the same as the field's name...
          // (We should trim spaces from the beginning and end of
          // the value string.)
		
          else if (elementsArray[i].value == elementsArray[i].name) {

            // ...display right.gif
            imagesArray[i].src = "../images/right.gif";
            correctAnswers++;
          }

          // If the text the neither blank, nor
          // the same as the field's name...
          else {

            // ...display wrong.gif
            imagesArray[i].src = "../images/wrong.gif";
          } 
        } // End if name != !Skip this field!"

        break; // End text fields

      // For drop-down menus
      case "select-one" : 

        // Set the source of the associated feedback image
        // to the value of the form field + ".gif".
        imagesArray[i].src = "" + elementsArray[i].value + ".gif";
        break;

      // For radio
      case "radio" : 

        // If the button is checked...
        if (elementsArray[i].checked == true) {

          // ...Set the source of the associated feedback image
          // to the value of the form field + ".gif".
          imagesArray[i].src = "" + elementsArray[i].value + ".gif";
	  if(elementsArray[i].value == "right"){
		correctAnswers++;
	  }
        }

        else {

          // ...set the image to blank.
          imagesArray[i].src = "../images/blank.gif";

        }

        break; // End for radio buttons.

      // For radio
      case "checkbox" : 

        // If the checkbox is checked...
        if (elementsArray[i].checked == true) {

          // If the word is supposed to be checked
          if (elementsArray[i].value == "right") {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/right.gif";
 	    correctAnswers++;
          }
          // If the word is not supposed to be checked
          else {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/wrong.gif";
          }

        } // End if item is checked


        // If the checkbox is not checked...
        else {

          // If the word is supposed to be checked
          if (elementsArray[i].value == "right") {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/wrong.gif";
          }
          // If the word is not supposed to be checked
          else {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/right.gif";
          }

        } // End if item is checked

        break; // End for checkboxes.

    } // End switch

    if (imagesArray[i]) {
	    if (imagesArray[i].src.indexOf("blank.gif") >= 0 ) {
		imagesArray[i].style.display = "none";
	    }
	    else {
		imagesArray[i].style.display = "inline";
	    }
    }

    i++;
  } // End loop through elementsArray
  //sendAnswers(numAnswers, correctAnswers);

} // End checkAnswers()

// This new version of check answers fixes a usability bug for checkbox excercises.
// Although checkAnswers worked as intended for radio button excercises, every single
// checkbox will receive a right/wrong mark making the excercise hard to read, but very
// easy to determine all correct answers instantly.
//
// The new code propagates previous wrong marks on checkboxes to the next checkbox of the
// same name, and then clears the old mark. Just name all checkboxes the same if they
// deal with the same question.
//
// Checkboxes without names will use the old checkAnswers behaviour.
//
// The new function is called checkAnswers2 until it is approved and renamed, or rejected and
// deleted.
//
function checkAnswers2(thisForm) {

  // i is a counter for our loops
  var i = 0;
  var numProblems = 0;

  // Feed the activity's feedback images into an array
  imagesArray = new Array();
  var formImages = thisForm.getElementsByTagName("img");

  // Loop through all images on the page
  while (formImages[i] != null) {

    // if the image source contains blank.gif, right.gif, or wrong.gif
    if (formImages[i].src.indexOf("blank.gif") >= 0 || formImages[i].src.indexOf("right.gif") >= 0 || formImages[i].src.indexOf("wrong.gif") >= 0) {

      // Put that object in the array
      imagesArray[imagesArray.length] = formImages[i];
      numProblems++;

    }
    i++;

  } // End looping through document's images
 


  // Feed the applicable form elements into an array.
  elementsArray = new Array();
  // Loop through all images on the page
  i = 0;
  var correctAnswers = 0;
  while (thisForm.elements[i] != null) {

    // if the image source contains blank.gif, right.gif, or wrong.gif
    if (thisForm.elements[i].type != undefined) {

      // Put that element in the array
      elementsArray[elementsArray.length] = thisForm.elements[i];

    }
    i++;

  } // End looping through document's images

  // reset the counter
  i = 0;

  last_checkbox = null;
  last_image = null;

  // This will loop through all of the form's elements.
  // We use i+1 so that we will not loop for the last 
  // element which is the check answers button.
  while (elementsArray[i+1] != null) {

    // Uncomment this next line to view the type of the current element.
    //alert (elementsArray[i].type);

    // Split for each type of form element
    switch (elementsArray[i].type) {

      // For text fields
      case "text" : 

        // Text fields named "!Skip this field!" will be ignored.
        if (elementsArray[i].name != "!Skip this field!") {
        
          // If the field is blank...
          if (elementsArray[i].value == "") {
			
            // ...display blank.gif
            imagesArray[i].src = "../images/blank.gif";
          }
	    // If the text the user put into the field
          // is the same as the field's name...
          // (We should trim spaces from the beginning and end of
          // the value string.)
		
          else if (elementsArray[i].value == elementsArray[i].name) {

            // ...display right.gif
            imagesArray[i].src = "../images/right.gif";
            correctAnswers++;
          }

          // If the text the neither blank, nor
          // the same as the field's name...
          else {

            // ...display wrong.gif
            imagesArray[i].src = "../images/wrong.gif";
          } 
        } // End if name != !Skip this field!"

        break; // End text fields

      // For drop-down menus
      case "select-one" : 

        // Set the source of the associated feedback image
        // to the value of the form field + ".gif".
        imagesArray[i].src = "" + elementsArray[i].value + ".gif";
        break;

      // For radio
      case "radio" : 

        // If the button is checked...
        if (elementsArray[i].checked == true) {

          // ...Set the source of the associated feedback image
          // to the value of the form field + ".gif".
          imagesArray[i].src = "" + elementsArray[i].value + ".gif";
	  if(elementsArray[i].value == "right"){
		correctAnswers++;
	  }
        }

        else {

          // ...set the image to blank.
          imagesArray[i].src = "../images/blank.gif";

        }

        break; // End for radio buttons.

      // For radio
      case "checkbox" : 

        // If the checkbox is checked...
        if (elementsArray[i].checked == true) {

          // If the word is supposed to be checked
          if (elementsArray[i].value == "right") {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/right.gif";
 	    correctAnswers++;
          }
          // If the word is not supposed to be checked
          else {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/wrong.gif";
          }

        } // End if item is checked


        // If the checkbox is not checked...
        else {

          // If the word is supposed to be checked
          if (elementsArray[i].value == "right") {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/wrong.gif";
          }
          // If the word is not supposed to be checked
          else {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../images/right.gif";
          }

        } // End if item is checked

        if (last_checkbox != null && last_checkbox.name == elementsArray[i].name && last_checkbox.name != "") {
		if (last_image.src.indexOf("wrong.gif") >= 0)
			imagesArray[i].src = last_image.src;
		last_image.src = "../images/blank.gif";
	}
      	last_checkbox = elementsArray[i];
	last_image = imagesArray[i];

        break; // End for checkboxes.

    } // End switch

    i++;
  } // End loop through elementsArray
  //sendAnswers(numAnswers, correctAnswers);

} // End checkAnswers()


function sendAnswers(numAnswers, correctAnswers){
    var str = "name=Name goes here&numAnswers=" + totalAnswers + "&correctAnswers=" + correctAnswers + "&pageTitle=" + document.title + "&pageAddress=" + window.location.href;

    str = escape(str);

    var url = escape("http://www.uccllt.info/toolkit/exercise_post.cfm");// No question mark needed

    var results = sendScores(str, url);


}


function sendScores(str,url)

{

   var doc = null

   if (typeof window.ActiveXObject != 'undefined' ) //This is to check whether MSIE

   {

       doc = new ActiveXObject("Microsoft.XMLHTTP");

       doc.onreadystatechange = displayState;

   }

   else //This is for any other browser besides MSIE

   {

       doc = new XMLHttpRequest();

       doc.onload = displayState;

   }

   doc.open( "POST", url, true );

   doc.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");

   doc.send(str);

   return doc;

}

function playMP3(args){
   var sendText = args.value;
   if(navigator.appName.indexOf("Microsoft") != -1) {
      var flash = window["flashSpeaker"];
    }else {
      var flash = document["flashSpeaker"];
    }
	flash.playSound(args);

}

function flashMovie(name)
{
 if(navigator.appName.indexOf("Microsoft") != -1)
 {
  return window[name];
 }
 else
 {
  return document[name];
 }
}

function showHand(){
	this.style.cursor='pointer';
}

function showPointer(){	
	this.style.cursor='auto';
}

function setSoundImages(){
	if(navigator.appName.indexOf("Microsoft") != -1) {
      ims=document.images
    }else {
      ims=window.document.images
    }
 	for (i=0;i<ims.length;i++) {
		tempSrc = ims[i].src;
  		if (tempSrc.indexOf("spkrlb.jpg") >=0 || tempSrc.indexOf("spkrdb.jpg") >=0 || tempSrc.indexOf("spkrwh.jpg") >=0 ) 
		    ims[i].style.cursor='pointer';
	}

}     
setSoundImages();

function getY( oElement )
{
var iReturnValue = 0;
while( oElement != null ) {
iReturnValue += oElement.offsetTop;
oElement = oElement.offsetParent;
}
return iReturnValue;
}

function getX( oElement )
{
var iReturnValue = 0;
while( oElement != null ) {
iReturnValue += oElement.offsetTop;
oElement = oElement.offsetParent;
}
return iReturnValue;
}

function show_hidden_text(element) {
  var hidden_text = element.parentNode.childNodes[0].innerHTML;
  element.parentNode.childNodes[0].innerHTML = "";
  element.parentNode.innerHTML += hidden_text;
}

function show_hidden_answer(element, qnum) {						// Step-by-step
  var field_value = element.childNodes[4].value;					// Value from the textfield
  var answer_code = element.childNodes[0].innerHTML;				// Hidden answer - raw code to be returned to browser
  var answer_text = element.childNodes[0].childNodes[1].innerHTML;	// Hidden answer - string only for data tracking
  element.innerHTML += answer_code;									// Append the answer to the end of the <p> tag
  element.childNodes[0].innerHTML = "";								// Clear the hidden answer field - prevents the answer from being appended multiple times
  element.childNodes[4].value = field_value;						// Repopulate the textfield
}

function show_hidden_hint(element) {				// Step-by-step
  var field_value = element.childNodes[4].value;	// Value from the textfield
  var hint_code = element.childNodes[1].innerHTML;	// Hidden hint - raw code to be returned to browser
  element.innerHTML += hint_code;					// Append the hint to the end of the <p> tag
  element.childNodes[1].innerHTML = "";				// Clear the hidden hint field - prevents the hint from being appended multiple times
  element.childNodes[4].value = field_value;		// Repopulate the textfield
}	

function retreiveContent(contentFile) {
	function getContent(contentFile) {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			xhr=new ActiveXObject('Microsoft.XMLHTTP');
			if (xhr) {
				xhr.onreadystatechange = postFileReady;
				xhr.open('GET', contentFile, true);
				xhr.send();
			}
		} else { // code for Mozilla, Safari, etc
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = postFileReady;
			xhr.open("GET", contentFile, true);
			xhr.send(null);
		} 
	}

	function postFileReady() {
		if (xhr.readyState == 4) {
			formatContent(xhr.responseText);
			xmlRequest = null;
		}
	}

	function formatContent(menu_string) {
		document.getElementById('content').innerHTML = menu_string;
	} // End formatContent()

	getContent(contentFile);
}  // End retreiveContent();

function getContentName(url) {
	return url.substring(url.lastIndexOf("/")+1, url.lastIndexOf("."))
}

//-->
