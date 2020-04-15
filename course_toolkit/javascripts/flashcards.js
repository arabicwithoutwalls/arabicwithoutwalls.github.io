/* 
This is a lot like the vocab_quiz.js file. It will load a tab-delimted vocab_list (formatted as shown below), then randomly quiz the viewer on the meanings.

The format of the vocab_list is as follows:
Response[tab]Question (stem)[tab]Group[tab]Sound file[return]
Response[tab]Question (stem)[tab]Group[tab]Sound file[return]
Response[tab]Question (stem)[tab]Group[tab]Sound file[return]
Response[tab]Question (stem)[tab]Group[tab]Sound file[return]
Response[tab]Question (stem)[tab]Group[tab]Sound file[return]
Response[tab]Question (stem)[tab]Group[tab]Sound file[return]

Example:
fire	le feu	noun	lefeu.mp3
fool	le fou	noun	lefou.mp3
bored s'ennuyer	verb	sennuyer.mp3
to wax one's skis	farter	verb	farter.mp3

Distractors for each item are chosen from the responses to other items in the same group.
In the above example, the question with the step "s'ennuyer" would have the options "bored" and "to wax one's skis."

Currently, options are always shuffled.

*/

// We have to put these outside of the function so they will persist through each flashcard.
// Vocab_words will get shorter with each flashcard that is displayed.
var vocab_words = new Array();
var options = new Array();

var total_words = 0;
var completed_words = 0;

var number_correct = 0;
var attempted = false;

function load_flashcards(stem) {

  // Reset counter
  total_words = 0;
  completed_words = 0;
  number_correct = 0

  var blank_elements = new Array();

  // We need to grab the vocab list, which is stored in a hidden div, and parse it into a 2D array.
  var vocab_list = document.getElementById('vocab_list').innerHTML;
  // First, we split the vocab list by lines.
  vocab_words = vocab_list.split("\n");
  // Now we loop through each line.
  for(var i=0;i<vocab_words.length;i++) {
    // We check that there is a tab in the line
    if(vocab_words[i].indexOf("\t") > -1) {
      vocab_words[i] = vocab_words[i].split("\t");
    }
    // If there wasn't a tab in the line, remember it so we can remove it later.
    else {
      blank_elements[blank_elements.length] = i;
    }
  }

  // So now we have the 2D array, and we need to remove the elements that didn't have tabs in them.
  vocab_words = remove_element(vocab_words,blank_elements);
  options = vocab_words;

  total_words = vocab_words.length;

  display_flashcard(stem);

} // End load flashcards.

function show_flashcard_menu() {
  document.getElementById('flashcards_display').innerHTML = '<form action="#"><p>How would you like the flashcards displayed?<select name="flashcards_display" id="flashcard_select"><option value="arabic_stem">An Arabic vocabulary word, with possible meanings in English</option><option value="english_stem">A meaning in English, with vocabulary words in Arabic</option><option value="random_stem">Randomly switch between the two</option></select><br /><br /><input type="button" value="Launch Flashcards" onclick="load_flashcards(this.form.flashcards_display.value);" /></form>'
}

function display_flashcard(stem) {

  // This will keep them from getting a point for a second attempt on the same flashcard.
  attempted = false;

  var HTML_code = "";

  if (vocab_words.length == 0) {
    score = Math.floor((number_correct/completed_words)*100);
    if (score > 90) {
      feedback = '<span class="header2">Great job!</span><br />You scored '+score+'% ('+number_correct+'/'+completed_words+').';
    }
    else if (score > 80) {
      feedback = '<span class="header2">Good work!</span><br />You scored '+score+'% ('+number_correct+'/'+completed_words+'). There may be some words you need to work on.';
    }
    else {
      feedback = '<span class="header2">Not adequate</span><br />Your score of '+score+'% ('+number_correct+'/'+completed_words+') indicates you need to work more on these vocabulary words.';
    }
    HTML_code = '<p>'+feedback+'</p><p><form><input type="button" value="Restart Activity" onclick="show_flashcard_menu();" /></form></p>';
  }
  else {

    // Let's work out the stem
    // Just a reminder: Element 0 = English; Element 1 = Arabic; Element 2 = group; Element 3 = soundfile.
    switch (stem) {
      case "english_stem" :
        stem_element = 0;
        options_element = 1; 
      break;
      case "arabic_stem" : 
        stem_element = 1;
        options_element = 0;
      break;
      case "random_stem" : 
        stem_element = (Math.floor(Math.random()*2));
        if (stem_element == 0) {
          options_element = 1;
        }
        else {
          options_element = 0;
        }
      break;
    }

    // We pick a random number that cooresponds to our next flashcard. 
    var random_flashcard = (Math.floor(Math.random()*vocab_words.length));
    var current_flashcard = vocab_words[random_flashcard];
    var random_flashcard_array = new Array();
    random_flashcard_array[0] = random_flashcard;
    vocab_words = remove_element(vocab_words,random_flashcard_array);
  
    // Increment word counter
    completed_words++;

    var HTML_code = '<form action="#"><table border="0"><tr><td colspan="3" align="center">Target Word ('+completed_words+' of '+total_words+'):<br />'+current_flashcard[stem_element];
    // Only display the audio button if there is a soundfile for this word.
    if (current_flashcard[3] != undefined && stem_element == 1) {
      HTML_code += '<a href="#" onclick="play('+"'"+current_flashcard[3].replace("\r","")+"'"+'); return false;"><img src="sounds/spkrwh.jpg" alt="Speaker Icon"/></a>';
    }
    HTML_code += '</td></tr>';

    // Get the options.
    var current_options = new Array;
    for (var i=0; i<options.length; i++) {
      // If this option is from the same group as the current flashcard
      // but is not the same option as the current flashcard's.
      if (options[i][2] == current_flashcard[2] && options[i][options_element] != current_flashcard[options_element]) {
        current_options[current_options.length] = options[i];
      }
    }

    current_options = shuffle_array(current_options);

    // If there were less than five options in the current flashcard's group
    // we need to pad the options with other distractors.
    if (current_options.length < 5) {
      var more_elements = 5 - current_options.length;
      for (var i=0;i<=more_elements;i++) {
        current_options[current_options.length] = options[i];
      }
    }

    // Otherwise, we need to trim the array down to five elements.
    else {
      var tmp_array = new Array();
      for (var i=0;i<5;i++) {
        tmp_array[tmp_array.length] = current_options[i];
      }
      current_options = tmp_array;
    }
  
    current_options[5] = current_flashcard;

    current_options = shuffle_array(current_options);

    for (var i=0; i<current_options.length; i++) {
      if (i%3 == 0) {
        HTML_code += "<tr>";
      }
      HTML_code += '\n<td style="border: 2px solid #000000" width="200" height="200" align="center"><img src="blank.gif" alt="Feedback Image" />';
      if (current_options[i][options_element] == current_flashcard[options_element]) {
        value = 'right';
      }
      else {
        value = 'wrong';
      }
      HTML_code += '<br /><input type="radio" name="flashcard" value="'+value+'" />';
      HTML_code += current_options[i][options_element];
      if (current_options[i][3] != undefined && options_element == 1) {
        HTML_code += '\n\t<a href="#" onclick="play('+"'"+current_options[i][3].replace("\r","")+"'"+'); return false;"><img src="sounds/spkrwh.jpg" alt="Speaker Icon"/></a>';
      }
      HTML_code += '<div id="hidden_option_' + i + '" style="display: none;">'+current_options[i][stem_element];
      if (current_options[i][3] != undefined && options_element == 0) {
        HTML_code += '\n\t<a href="#" onclick="play('+"'"+current_options[i][3].replace("\r","")+"'"+'); return false;"><img src="sounds/spkrwh.jpg" alt="Speaker Icon"/></a>';
      }
       HTML_code += '</div>';
      HTML_code += "</td>";
      if ((i+1)%3 == 0) {
        HTML_code += "</tr>";
      }
    } // End loop through options

    HTML_code += '</table><form><table border="0"><tr><td width="154"><input type="button" value="Check Answer" onclick="checkAnswers(this.form); show_flashcard(this.form);" /></td>';
    if (completed_words > 1) {
      HTML_code += '<td width="154" align="center">Your score: '+Math.floor((number_correct/(completed_words-1))*100)+'%</td>';
    }
    else {
      HTML_code += '<td width="154">&nbsp;</td>';
    }
    HTML_code += '<td width="154" align="right"><input type="button" value="Next Word ->" onclick="display_flashcard('+"'"+stem+"'"+')" id="next_word" style="display: none;" /></td></tr></table>'
    HTML_code += '<p><input type="button" value="Restart Activity" onclick="show_flashcard_menu();" /></p></form>';

  }  // End there still are vocab words.

  document.getElementById('flashcards_display').innerHTML = HTML_code;

}  // End display flashcards

// Takes in two arrays. The first is the array from which you wish to remove elements. The second contains the indecies of the elements to remove.
function remove_element(from_this_array, these_elements) {

  // We'll store the modified array here:
  var output_array = new Array();

  // We must first sort the indecies to be removed in descending order. If we don't work from the back of the array, the indecies will be different each round.
  these_elements = these_elements.sort().reverse();

  for (var i=0; i<from_this_array.length;i++) {
    if (search_array(these_elements,i) == true) {
      // Do nothing.
    }
    else {
      output_array[output_array.length] = from_this_array[i];
    }
  }
  return output_array;
}

// This is called when "check answers" is clicked. It reveals the selected flashcard and increments scoring. It also displays the "next word" button.
function show_flashcard(this_form) {
  for (var i=0;i<this_form.elements.length;i++) {
    if(this_form.elements[i].checked == true) {
      document.getElementById('hidden_option_' + i).style.display = 'block';
      if (this_form.elements[i].value == "right" && attempted == false) {
        number_correct++;
      }
      attempted = true;
      document.getElementById('next_word').style.display = 'block';
    }
  }
}

// Finds exact matches within an array. Returns true or false;
function search_array(this_array,this_value) {
  for (var i=0;i<this_array.length;i++) {
    if (this_array[i] == this_value) {
      return true;
    }
  }
  return false;
}

// I thought ECMAscript would have Array::shuffle by now.
function shuffle_array(this_array) {

  var tmp_array = new Array(this_array.length);
  for (var i=0; i<tmp_array.length; i++) {
    tmp_array[i] = Math.random() + "|" + i;
  }
  tmp_array = tmp_array.sort();

  var output_array = new Array(this_array.length);
  for (var i=0; i<tmp_array.length; i++) {
    tmp_array[i] = tmp_array[i].substr(tmp_array[i].indexOf("|")+1);
    output_array[tmp_array[i]] = this_array[i];
  }
  return output_array;
}
