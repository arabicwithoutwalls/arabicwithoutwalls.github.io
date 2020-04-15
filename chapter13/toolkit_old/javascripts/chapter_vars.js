/*
These values are used in the page layout. Mainly, they are the URLs used in the hrizontal menu..
*/

var chapter_title = "Chapter 13"; // This appears above the menu on the page.

var course_content_url = "course";
var syllabus_url = "syl";
var chat_url = "chat";
var forums_url = "forums";
var resources_url = "resources";
var requirements_url = "reqs";
var instructor_email_url = "email";
var about_aww_url = "about";

// This is needed because the validation doesn't like the A tag in the script in the page body.
function format_link(url,url_text) {
  return '<a href="'+url+'">'+url_text+'</a>';
}