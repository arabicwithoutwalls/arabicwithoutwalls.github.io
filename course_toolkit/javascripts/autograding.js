function autoGradeAndSubmit(thisForm)
{
	elementsArray = new Array();
	var elem;
	var string = "\n";
	for(i=0; thisForm.elements[i] != null; i++)
		if (thisForm.elements[i].type == "select-one")
			elementsArray[elementsArray.length] = thisForm.elements[i];
	for(i=0; i < elementsArray.length; i++)
	{
		elem = elementsArray[i];
		
		string += "<input type=\"hidden\" name=\"";
		string += elem.name;
		string += "-response";
		string += "\" value=\"";
		chosen = "";
		for (j = 0; j < elem.options.length; j++)
			if (elem.options[j].selected) 
				chosen = elem.options[j].innerHTML;
		string += chosen;
		string += "\" >\n";
	}
	var hidden = document.getElementById("autohidden");
	hidden.innerHTML = string;
	thisForm.submit();
}
