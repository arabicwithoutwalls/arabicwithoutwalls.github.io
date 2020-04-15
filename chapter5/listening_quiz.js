quiz1 = new Array(5);
	 var numProblems = 50;
	 var answers;
	 var questions;
	 var numProblemsRight = true;
	 var percentage = false;
	 var letterGrade = false;
	 var evaluation = true;
	 var feedback = true;
	 var caseSensitive = false;
	 var title = "";
	 var numNoGrade = 0;

	 var Feedback = new Array(numProblems + 1);
	 var Media = new Array(numProblems + 1);
	 var MediaType = new Array(numProblems + 1);
	 function setArrayNull(theArray){
	 	for(var i=0;i<theArray.length;i++) {
  			theArray[i] = null;
		}
	 }
	 function checkQuiz (quizNum)
	 {
	 	switch (quizNum)
		{
			case 1:
				numProblemsRight = true;
				percentage = false;
				letterGrade = false;
				evaluation = true;
				feedback = false;
				caseSensitive = false;
				questionsnew = new Array(5);
				questionsnew[0] = new Array("ng","How is the weather in Jordan during the spring?","en","معتدل","ar","");
				questionsnew[1] = new Array("ng","During which months is the weather is the weather hot in Jordan?","en","حار في الصيف وخاصة في الشهر السابع وفي الشهر الثامن أيضا","ar","");
				questionsnew[2] = new Array("ng","What is spring like in Ann Arbor according to Khalid?","en","أما الطقس في أن أربور، فبارد جدا في فصل الشتاء و أيضا بارد في فصل الربيع","ar","");
				questionsnew[3] = new Array("ng","How is the weather in Ann Arbor during September and October (Hint: in the 9th and 10th months)?","en","Humid","en","");
				questionsnew[4] = new Array("ng","How does Khalid feel about the weather in Michigan?","en","الطقس في ميشغان بارد، و أنا لا أحب الطقس في ميشغان","ar","");
				answers = new Array("Moderate","حار في الصيف و خاصة في الشهر السابع و في الشهر الثامن أيضا","أما الطقس في أن أربور، فبارد جدا في فصل الشتاء و أيضا بارد في فصل الربي","و الطقس في الشهر التاسع و العاشر معتدل، و يميل الى البرودة بشكل عام","الطقس في ميشغان بارد، و أنا لا أحب الطقس في ميشغان");
				questions = new Array("How is the weather in Jordan during the spring?","During which months is the weather hot in Jordan?","What is spring like in Ann Arbor according to Khalid?",
				"How is the weather in Ann Arbor during September and October (Hint: in the 9th and 10th months)?","How does Khalid feel about the weather in Michigan?");
				numProblems = 5;
				title = "Chapter 5 Quiz";
				printFeedback(quiz1);
				break;
			default: 
				alert("No grading script for this quiz");
				break;
		}
	}
		function swapImage(wndw,arraynum,isource)
		{
			if (isNaN(parseInt(arraynum)) && wndw.document[arraynum]) wndw.document[arraynum].src = isource;
			else if (wndw.document.images[arraynum]) wndw.document.images[arraynum].src = isource;
		}
function Verify(form) 
	{
	points = new Array ();
	points[0]="0";  
	for (var i=1; i<form.elements.length; i++) 
	{
		if (form.elements[i].name != form.elements[i-1].name)  
		{
			points[points.length] = i;  
		}
	} //for
	points[points.length] = form.elements.length;
	for (var i=1; i<points.length; i++) 
	{
		var answered=true;
		switch (form.elements[points[i-1]].type) 
		{
			case "radio" : {}
			case "checkbox" : 
			{
				var y=0;
				for (var j=points[i-1]; j<points[i]; j++) 
				{
					if (form.elements[j].checked)  
					{
						y++; break;   
					}
				}
				if (y==0) 
				{
					answered=false;    
				}
				break;
			}  // case checkbox
			case "select-one": 
			{
				if (form.elements[points[i-1]].options[0].selected)  
				{
					answered=false;    
				}
				break;
			}  // case SelectBox
			case "text" : {}
			case "textarea": 
			{
				if ((form.elements[points[i-1]].value=="Your Answer:")||
					(form.elements[points[i-1]].value=="")) 
				{
					answered=false; 
				}
				break;
			}  // case SelectBox 
		} //switch
		if (!answered) 
		{
			alert("Please answer all the questions");
			return false;  
		}
	} //for statement
	//	top.LoadAnswer(form.name,width,height,xpos,ypos,flag);
	return true;
	} //Verify function 
function compare(i)
{
	var j = 0, temp = "" + answers[i];
	var tempAnswers = new Array("","","","","","","","","","","","","","","","","","","","");
	while(temp.indexOf(",") != -1)
	{
		tempAnswers[j] = temp.substring(0,temp.indexOf(","));
		temp = temp.substring(temp.indexOf(",")+1, temp.length);
		j++;
	}
	tempAnswers[j] = temp;
	j=0;
	while(tempAnswers[j] != null)
	{
		if(tempAnswers[j] == userInput[i])
		{
			return true;
		}
		j++;
	}
	return false;
}

/* Scores the test and outputs to page*/

function printFeedback(userinput){
	var isScore = false;
	numNoGrade = 0;
	userInput = userinput;
	endTime = new Date();
	var currentElement;
	var perc;
	var temp;
	wronglist= new Array(numProblems);
	rightlist= new Array(numProblems);
	setArrayNull(wronglist);
	setArrayNull(rightlist);
	var score=0;
	/*Makes input case-insensitive*/
	for(j=0;j < answers.length; j++){			   
			temp = answers[j];
			temp = ""+temp;				
			temp = temp.toLowerCase();
			answers[j] = temp;
			temp = userInput[j];
			temp = ""+temp;
			temp = temp.toLowerCase();
			userInput[j] = temp;
		}
	
   for (var j=0 ; j<numProblems ; j++)	{
   		formatString = "";
//   	alert("Question: " + questionsnew[j][3]);
		if(questionsnew[j][0] == "ng"){
			if ( compare(j) )//userInput[i] == answers[i])
			{ 
	   			score = score + 1;
				rightlist[j]=j + 1;
			} 
			else
			{
				wronglist[j]=j + 1;
			}
		}
		else {
			isScore = true;
			rightlist[j] = j+ 1;
			score = score + 1; // What if there gradd and not graded?
		}
		
   		if (wronglist[j] != null)
			{ 
				//alert("wronglist");
			  	if(questionsnew[j][0] == "ng") { 
		//			alert("It's wrong!");
	      	  	currentElement = document.getElementById("q"+j+"feedback");
				if(questionsnew[j][4] == "ar"){
					currentElement.innerHTML =  "<font dir='rtl' class='arFeedback'> " + questionsnew[j][3] + "</font>";
					}
				else
					currentElement.innerHTML =  "<font class='enFeedback'>"+questionsnew[j][3]+"</font>";
					//Need to implement font direction and color! 
				}
				else if(questionsnew[j][0] == "g"){
					//Need to show graphic
				}
			}
		else {
//			alert("rightlist");
			if(questionsnew[j][0] == "ng") { 
			currentElement = document.getElementById("q"+j+"feedback");
				if(questionsnew[j][4] == "ar"){
					currentElement.innerHTML =  "<font dir='rtl' class='arFeedback'> " + questionsnew[j][3] + "</font>";
					}
				else
					currentElement.innerHTML =  "<font class='enFeedback'>"+questionsnew[j][3]+"</font>";
					//Need to implement font direction and color! 
			}
		  	else if(questionsnew[j][0] == "g"){
					//Need to show graphic
			}
		}
	 }//end for 
	perc = (score*100)/(numProblems);
	perc = 100;
	if(isScore){	
	 currentElement	 = document.getElementById("score");
	 currentElement.innerHTML = "Your Score is " + score + " out of " + (numProblems-numNoGrade) + ". " + Math.round(perc) + "%";

	}
}//end winopen function