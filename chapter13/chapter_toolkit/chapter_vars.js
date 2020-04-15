/*
These values are used in the page layout. Mainly, they are the URLs used in the hrizontal menu..
*/

var chapter_title = "Chapter 13"; // This appears above the menu on the page.

var course_content_url = "../coursecontent.html";
var syllabus_url = "../syllabus.html";
var chat_url = "http://ucdavis.horizonwimba.com/ucdavis/voicedirect?action=display&rid=223-1232597098183";
var forums_url = "http://ucdavis.horizonwimba.com/ucdavis/board?action=display&rid=222-1232596896537";
var resources_url = "../resources.html";
var requirements_url = "../requirements.html";
var instructor_email_url = "mailto:shiri@socrates.berkeley.edu?subject=Contact from AWW site";
var about_aww_url = "../aboutaww.html";

// This is needed because the validation doesn't like the A tag in the script in the page body.
function format_link(url,url_text) {
  return '<a href="'+url+'">'+url_text+'</a>';
}