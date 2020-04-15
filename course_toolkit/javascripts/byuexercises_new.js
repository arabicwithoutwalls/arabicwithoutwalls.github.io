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

// Root directory of our PHP/AJAX wrapper
var byuScriptRoot = "http://arabicwithoutwalls.ucdavis.edu/";
var responses;
parent.frameURL = document.URL;


// initiated by the 'Check Answers' button featured on several activities.  Determines if each response is correct or incorrect, displays appropriate
// image (check, X, or blank) for each response, and prepares the data to be stored into the database (see functions: build_response() and send_response())
function checkAnswers(thisForm) {
	responses = new Array();
	// Stores the result for each question...right or wrong...neutral is not recorded
	var theResult;
	// Stores the learner response for each question
	var learner_response;
	// Pulls the chapter number and exercise name from the URL...used in storing timestamp and user responses in the database
	var pageInfo = getInfoFromURL("child");
	// Creates and stores a timestamp for an activity...the timestamp should match for each question in an activity
	if(pageInfo[1].match('_flashcards') != '_flashcards') var timeStamp = send_timestamp(pageInfo);
	
  // i is a counter for our loops
  var i = 0;
  var radioCounter = 1;
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
        
			learner_response = elementsArray[i].value;
		
          // If the field is blank...
          if (elementsArray[i].value == "") {
			
            // ...display blank.gif
            imagesArray[i].src = "../course_toolkit/images/blank.gif";
          }
	    // If the text the user put into the field
          // is the same as the field's name...
          // (We should trim spaces from the beginning and end of
          // the value string.)
		
          else if (elementsArray[i].value == elementsArray[i].name) {

            // ...display right.gif
            imagesArray[i].src = "../course_toolkit/images/right.gif";
            correctAnswers++;
			
			build_response(learner_response, 1, i + 1, elementsArray[i].type);

          }

          // If the text the neither blank, nor
          // the same as the field's name...
          else {

            // ...display wrong.gif
            imagesArray[i].src = "../course_toolkit/images/wrong.gif";
			
			build_response(learner_response, 0, i + 1, elementsArray[i].type);
          } 
        } // End if name != !Skip this field!"

        break; // End text fields

      // For drop-down menus
      case "select-one" : 

        // Set the source of the associated feedback image
        // to the value of the form field + ".gif".
        imagesArray[i].src = "" + elementsArray[i].value + ".gif";
		
		// Send results to wrapper
		learner_response = elementsArray[i].options[elementsArray[i].selectedIndex].innerHTML;
		theResult = checkResult(elementsArray[i].value);
		if(theResult != "-1") {
			build_response(learner_response, theResult, i + 1, elementsArray[i].type);
		}

		break;

      // For radio
      case "radio" : 

		learner_response = "radio-check";

        // If the button is checked...
        if (elementsArray[i].checked == true) {

          // ...Set the source of the associated feedback image
          // to the value of the form field + ".gif".
          imagesArray[i].src = "" + elementsArray[i].value + ".gif";
		  if(elementsArray[i].value == "right") {
			correctAnswers++;
		  }
		 	// Send results to wrapper
			theResult = checkResult(elementsArray[i].value);
			build_response(learner_response, theResult, radioCounter, elementsArray[i].type);
			
			radioCounter++;
        }

        else {

          // ...set the image to blank.
          imagesArray[i].src = "../course_toolkit/images/blank.gif";

        }

        break; // End for radio buttons.

      // For radio
      case "checkbox" : 

		learner_response = "checkbox-check";
			
        // If the checkbox is checked...
        if (elementsArray[i].checked == true) {

          // If the word is supposed to be checked
          if (elementsArray[i].value == "right") {

		 	// Send results to wrapper
			build_response(learner_response, 1, i + 1, elementsArray[i].type);

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../course_toolkit/images/right.gif";
 	    correctAnswers++;
          }
          // If the word is not supposed to be checked
          else {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../course_toolkit/images/wrong.gif";
			
			// Send results to wrapper
			build_response(learner_response, 0,  i + 1, elementsArray[i].type);
          }

        } // End if item is checked


        // If the checkbox is not checked...
        else {

          // If the word is supposed to be checked
          if (elementsArray[i].value == "right") {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../course_toolkit/images/wrong.gif";
			
			// Send results to wrapper
			build_response(learner_response, 0, i + 1, elementsArray[i].type);
          }
          // If the word is not supposed to be checked
          else {

            // ...Set the source of the associated feedback image
            // to the value of the form field + ".gif".
            imagesArray[i].src = "../course_toolkit/images/right.gif";
			
			// Send results to wrapper
			build_response(learner_response, 1, i + 1, elementsArray[i].type);
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
  send_response(pageInfo[0], pageInfo[1], timeStamp);

} // End checkAnswers()



function show_hidden_text(element) {
  var hidden_text = element.parentNode.childNodes[0].innerHTML;
  element.parentNode.childNodes[0].innerHTML = "";
  element.parentNode.innerHTML += hidden_text;
}

function build_response(Response, Correct, Question_num, Question_type) {
	var x = responses.length;
	responses[x] = "&response"+ x+"="+ Response +"&correct"+ x +"="+ Correct +"&qnum"+ x +"="+ Question_num +"&qtype"+ x +"="+ Question_type
}

// Function called from checkAnswers()...submits each user response to the database
function send_response(Chapter, Page, stamp) {
//get version
/*
	// Location of the record.php page
	var location = byuScriptRoot + "record.php";
	location += "?response_type=question&user= "+ parent.sessionUserName + "&response=" + Response + "&correct=" + Correct + "&Page=" + Page + "&Chapter=" + Chapter + "&qnum=" + Question_num + "&qtype=" + Question_type + "&timestamp=" + stamp;
	var request;
	
	// Create an AJAX object, send parameters
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}

	request.open("GET", location, false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	request.setRequestHeader('Cache-Control', 'no-cache')
	request.send(null);
*/
// post version
	if(Page.match('_flashcards') != '_flashcards' && parent.sessionUserName != "undefined") {
		var location = byuScriptRoot + "record_post.php";
		// Create an AJAX object, send parameters
		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else {
			request = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}
		
		request.open("POST", location, false);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		request.setRequestHeader('Cache-Control', 'no-cache')
		var sendBody = "response_type=question&user= "+ parent.sessionUserName + "&Page=" + Page + "&Chapter=" + Chapter + "&timestamp=" + stamp +"&responseCount="+ responses.length;
		for(var iter = 0; iter < responses.length; iter++) {
			sendBody += responses[iter];
		}
		
		request.send(sendBody);	
	}
}

// Function called from show_hidden_answer()...sends response to database
function send_text_response(Response, correctResponse, Chapter, Page, Question_num, stamp) {
	var location = byuScriptRoot + "record.php";
	location += "?response_type=textAnswer&user= "+ parent.sessionUserName + "&response=" + Response + "&correct_response="+ correctResponse +" &Page=" + Page + "&Chapter=" + Chapter + "&qnum=" + Question_num + "&timestamp=" + stamp;
//	alert(location);
	parent.dbinterface.location = location;
}

// Function that pulls the chapter number and activity name from the window location
function getInfoFromURL(frame) {
	if(frame == "child") {
		var returnArray = new Array(2);
		var slashIndex = document.URL.lastIndexOf('/');
		var chapterIndex = document.URL.indexOf('chapter');
		var chapterLength = slashIndex - chapterIndex;
		returnArray[0] = document.URL.substr((chapterIndex + 7), (chapterLength - 7));
		returnArray[1] = document.URL.substr((slashIndex + 1));
		return returnArray;
	} else if(frame == "parent") {
		var returnArray = new Array(2);
		var slashIndex = frameURL.lastIndexOf('/');
		var chapterIndex = frameURL.indexOf('chapter');
		var chapterLength = slashIndex - chapterIndex;
		returnArray[0] = frameURL.substr((chapterIndex + 7), (chapterLength - 7));
		returnArray[1] = frameURL.substr((slashIndex + 1));
		return returnArray;
	}
}

// Function that takes a result input and returns 1 for correct, 0 for incorrect, and -1 for neutral
function checkResult(resultString) {
	var returnResult;
	switch(resultString) {
		case "right":
			returnResult = "1";
			break;
		case "wrong":
			returnResult = "0";
			break;
		default:
			returnResult = "-1";
			break;
	}
	
	return returnResult;
}

// Function that creates a UNIX timestamp
function get_timestamp() {
	var tStamp = new Date();
	tStamp = tStamp.getTime() / 1000;
	tStamp = Math.round(tStamp);
	
	return tStamp;
}

// Function that stores a timestamp in the times table when checkAnswers is submitted
function send_timestamp (infoFromPage) {
	var tStamp = get_timestamp();
	var location = "../record.php";
	location += "?response_type=time&type=checkAnswers&user= "+ parent.sessionUserName + "&timestamp="+ tStamp +"&chapter="+ infoFromPage[0] +"&page=" + infoFromPage[1];
	parent.dbinterface.location = location;
	
	return tStamp;
}

//***************************************************************************************************************************************************
//	These functions are for building student reports, Indicating which activities which are complete, incomplete, and unattempted
//	Also calculates and displays score where applicable.  These functions are generally called from the page 'chapterguide.html' 
//***************************************************************************************************************************************************

// Function that provides visual and textual feedback regarding activities
function writeFeedback(pageName, chapNum, numQuestions) {
	var user_name = parent.sessionUserName;
	var status;
	var textFeedback = '<br /><span style="color: #fff;">N/A</span>';

	// isComplete() will return 1 if complete, 0 if incomplete, and -1 if unattempted
	var completion_var = isComplete(pageName, chapNum, user_name, numQuestions);
	switch(completion_var) {
		case 1:
			status = "complete";
			// If the activity has no online activity associated with it, simply print out "Done"
			// Otherwise, calculate a score for the activity
			if(numQuestions <= 0) {
				textFeedback = 	'<br /><p class="scoreFeedback">Done</p>';
			} else textFeedback = '<br /><p class="scoreFeedback">'+ calculateScore(pageName, chapNum, user_name, numQuestions) +'</p>';
			break;
		case 0:
			status = "incomplete";
			break;
		default:
			status = "unattempted";
			break;
	}
	document.writeln('<img src="../images/'+ status +'.gif" alt="'+ status +'" title="'+ status +'" class="completionFeedback" />' + textFeedback);
}

// Function that checks the completion of activities--those that have checkAnswers and those that do not
// Pass in numQuestions = 0 to indicate an activity has no checkAnswers
function isComplete(pageName, chapNum, userName, numQuestions) {
	if(numQuestions == 0) {
		var returnVal = checkSubmit(pageName, chapNum, userName);
		if(returnVal > 0) {
			return 1;	
		} else return -1;
	} else {
		if(numQuestions > 0) {
			var questionsCompleted = getCount(pageName, chapNum, userName, "total"); 
			if(questionsCompleted == numQuestions) {
				return 1;
			} else if (questionsCompleted == 0) {
				return -1;	
			} else {
				return 0;	
			}
		} else {
			var questionsCompleted = getCount(pageName, chapNum, userName, "total"); 
			if(questionsCompleted == (numQuestions * -1)) {
				return 1;
			} else if (questionsCompleted == 0) {
				return -1;	
			} else {
				return 0;	
			}
		}
	}
}

// Function that queries the database for a response count
// result = 'total' will return a count of student responses
// result = 'correct' will return a count of student responses that are correct
function getCount(pageName, chapNum, userName, result) {

	// Location of the chapter guide PHP script
	var location = byuScriptRoot + "includes/chapterGuideFunctions.php";
	location += "?do=selectQuery&result="+ result +"&page="+ pageName +"&chapter="+ chapNum +"&user= "+ userName;
	var request;
	
	// Create an AJAX object, send parameters
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
	request.open("GET", location, false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	request.setRequestHeader('Cache-Control', 'no-cache')
	request.send(null);
	return request.responseText; // also .responseXML
}

// Function that calculates the score for a completed activity
function calculateScore(pageName, chapNum, userName, numQuestions) {
	var numCorrect = parseInt(getCount(pageName, chapNum, userName, "correct")); 
	return Math.round((numCorrect / numQuestions) * 100) + "%";
}

// Function that creates a button to mark completion of activities with no checkAnswers
function writeSubmit(pageName, chapNum) {
//	document.writeln('<input type="button" value="Completed" onclick="userSubmit(\''+ pageName +'\', \''+ chapNum +'\')" />');
	document.writeln('<a href="javascript:userSubmit(\''+ pageName +'\', \''+ chapNum +'\')" title="Mark this activity as complete"><img style="border-width: 0; position: relative; top: 5px;" src="../images/submit_button.jpg" alt="Complete" onmouseover="swapImage(this, \'../images/submit_button_over.jpg\')" onmouseout="swapImage(this, \'../images/submit_button.jpg\')" /></a>');
}

// Function to mark completion of activities with no checkAnswers
function userSubmit(pageName, chapNum) {
	
	// Location of the chapter guide PHP script
	var location = byuScriptRoot + "includes/chapterGuideFunctions.php";
	location += "?do=userSubmit&page="+ pageName +"&chapter="+ chapNum +"&user= "+ parent.sessionUserName +"&timestamp=" + get_timestamp();
	
	// Create an AJAX object, send parameters
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
	request.open("GET", location, false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	request.setRequestHeader('Cache-Control', 'no-cache')
	request.send(null);
	window.location.reload();
}

// Function to check the completion of activities with no checkAnswers
function checkSubmit(pageName, chapNum) {

	// Location of the chapter guide PHP script
	var location = byuScriptRoot + "includes/chapterGuideFunctions.php";
	location += "?do=checkSubmit&page="+ pageName +"&chapter="+ chapNum +"&user= "+ parent.sessionUserName;

	// Create an AJAX object, send parameters
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
	request.open("GET", location, false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	request.setRequestHeader('Cache-Control', 'no-cache')
	request.send(null);
	return request.responseText;
}

//*****************************************************************************************************************
//	End of student report functions
//*****************************************************************************************************************


// Function to create a mouseover
function swapImage(image, newsrc) {
	image.src = newsrc;
}

function show_hidden_text(element) {
  var hidden_text = element.parentNode.childNodes[0].innerHTML;
  element.parentNode.childNodes[0].innerHTML = "";
  element.parentNode.innerHTML += hidden_text;
}

function show_hidden_answer(element, qnum) {						// Step-by-step
  var pageInfo = getInfoFromURL("child");							// Pull page info from the URL
  var tStamp = get_timestamp();										// Create UNIX timestamp
  var field_value = element.childNodes[4].value;					// Value from the textfield
  var answer_code = element.childNodes[0].innerHTML;				// Hidden answer - raw code to be returned to browser
  element.innerHTML += answer_code;									// Append the answer to the end of the <p> tag
  element.childNodes[0].innerHTML = "";								// Clear the hidden answer field - prevents the answer from being appended multiple times
  element.childNodes[4].value = field_value;						// Repopulate the textfield
  
  if(answer_code != "") {
	  if(field_value != "") {
	  	send_text_response(field_value, answer_code, pageInfo[0], pageInfo[1], qnum, tStamp);
	  }
  }
}

function show_hidden_hint(element) {				// Step-by-step
  var field_value = element.childNodes[4].value;	// Value from the textfield
  var hint_code = element.childNodes[1].innerHTML;	// Hidden hint - raw code to be returned to browser
  element.innerHTML += hint_code;					// Append the hint to the end of the <p> tag
  element.childNodes[1].innerHTML = "";				// Clear the hidden hint field - prevents the hint from being appended multiple times
  element.childNodes[4].value = field_value;		// Repopulate the textfield
}

function onload_timestamp() {
	var pageInfo = getInfoFromURL("parent");
	var tStamp = get_timestamp();
	var location = "record.php";
	location += "?response_type=time&type=onload&user="+ parent.sessionUserName + "&timestamp="+ tStamp +"&chapter="+ pageInfo[0] +"&page=" + pageInfo[1];
	dbinterface.location = location;
	if(pageInfo[1] == "index.html") {
		location = "record.php";
		location += "?response_type=user&section="+ parent.sectionName +"&username="+ parent.sessionUserName +"&firstname="+ parent.sessionUserFirst +"&lastname="+ parent.sessionUserLast +"&email="+ parent.sessionUserMail;
		dbinterface.location = location;
	}
}
//-->
