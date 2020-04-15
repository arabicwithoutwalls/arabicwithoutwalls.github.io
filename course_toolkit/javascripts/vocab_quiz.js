/* 
This function parses the contents of the vocab_list DIV elements and formats them into a quiz in the vocab_quiz DIV.
The arguments are the number of items (which will be chosen from the available items) and whether or not the items
and options are to be shuffled (randomized).

The format of the vocab_list is as follows:
Response[tab]Question (stem)[tab]Group[return]
Response[tab]Question (stem)[tab]Group[return]
Response[tab]Question (stem)[tab]Group[return]
Response[tab]Question (stem)[tab]Group[return]

Example:
fire	le feu	noun
fool	le fou	noun
bored s'ennuyer	verb
to wax one's skis	farter	verb

Distractors for each item are chosen from the responses to other items in the same group.
In the above example, the question with the step "s'ennuyer" would have the options "bored" and "to wax one's skis."

Currently, options are always shuffled.

Note: If you have more than 10 items, but only want ten, and do not shuffle them, only the first ten will be displayed.
In other words, if you want a random 10 items, the second argument (shuffle_items) needs to be true.
*/

function load_quiz(number_of_items,shuffle_items) {

  var blank_elements = new Array();

  // We need to grab the vocab list, which is stored in a hidden div, and parse it into a 2D array.
  var vocab_list = document.getElementById('vocab_list').innerHTML;
  // First, we split the vocab list by lines.
  var vocab_words = vocab_list.split("\n");
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

  var output = '\r\n<form action="#"><ol>';

  var options_array = new Array();

  // OK, this is the holy hand grenade of hacks, but they want a random ten words chosen from the list. So here goes...
  // Create an array the same length as the vocab_words.
  var random_array = new Array(vocab_words.length);
  for (var i=0; i<random_array.length; i++) {
    random_array[i] = " : " + i;
  }
  // Fill that array with randomness, with the original order of the element tacked on to the end.
  if (shuffle_items == true) {
    for (var i=0; i<random_array.length; i++) {
      random_array[i] = Math.random() + random_array[i];
    }
    // Sort by the random numbers
    random_array = random_array.sort();

    // Just in case there are fewer than ten items on this quiz.
    if (random_array.length < number_of_items) {
      number_of_items = random_array.length;
    }
  }

  // Take the first ten (or less) elements...
  for (var i=0; i<number_of_items; i++) {
    random_array[i] = random_array[i].substring((random_array[i].indexOf(":")+2));
  }

  // Loop through the 2D array.
  var word = new Array();
  for (var i=0;i<number_of_items;i++) {

    word = vocab_words[random_array[i]];
    output = output + "\r\n<li>";
    //// UNCOMMENT FOR SOUND //// output = output + '<a href="#" onclick="play(' + "'" + word[3] + "'" + '); return false;"><img src="sounds/spkrwh.jpg" alt="Speaker Icon"/></a>';
  // font size kludged in here by James Muehlner because I can't figure out where the heck it's being set!
 // font type kludged in as well........................
    output = output + word[1] + ' <img src="blank.gif" alt="Feedback Image"><select style="font-size:12px; font-family: verdana;"  name="q'+i+'"><option value="blank">--</option>';

    options_array = new Array();
    for (var j=0;j<vocab_words.length;j++) {
      if (vocab_words[j][2] == word[2]) {
        options_array[options_array.length] = vocab_words[j][0];
      }
    }

    options_array = shuffle_array(options_array);

    for (var j=0;j<options_array.length;j++) {
      if (options_array[j] == word[0]) {
        value = 'right';
      }
      else {
        value = 'wrong';
      }
      output = output + '<option value="'+ value +'">' + options_array[j] + "</option>";
    }
    output = output + "</select></li>";
  }
 
  output = output + '\r\n</ol><p align="center"><input type="button" value="Check Answers" onclick="checkAnswers(this.form);" /></p></form>';
  document.getElementById('vocab_quiz').innerHTML = output;

}

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
  for (var i=0;i<this_array.length;i++) { 
    this_array[i] = Math.random() + "|" + this_array[i];
  }
  this_array = this_array.sort();
  for (var i=0;i<this_array.length;i++) { 
    this_array[i] = this_array[i].split("|")[1];
  }
  return this_array;
}
