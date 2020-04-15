# This script is designed to be run from within each chapter's folder.

# First we take care of the chapter-specific toolkit. 
# There is no reason to have all the subfolders in the toolkit
# if we're only going to have a few files in it. Those files
# are:
# The chapter banner image.
# The chapter_var.js
# The menudefinition.txt
#
# All stylesheets, flashmovies, and JS files (other than
# chapter_vars.js) can be moved to the course toolkit.

# Create a chapter_toolkit folder.
mkdir chapter_toolkit

# Copy the chapter vars, menu def, chapter banner into the 
# chapter toolkit.
cp toolkit/javascripts/chapter_vars.js chapter_toolkit/chapter_vars.js

## NEXT LINE ONLY WORKS FOR ALIF BAA IT MUST BE CHANGED FOR EACH CHAPTER ##
cp toolkit/images/alifbaa_banner.jpg chapter_toolkit/chapter_banner.jpg
cp toolkit/menudefinition.txt chapter_toolkit/menudefinition.txt

# Change the files to point to the chapter_toolkit.
perl -p -i -e 's/\<script type\=\"text\/javascript\" src\=\"toolkit\/javascripts\/chapter\_vars\.js\"\>\<\/script\>/###/' *.html
perl -p -i -e 's!###!<script type="text/javascript" src="chapter_toolkit/chapter_vars.js"></script>!' *.html


##### START TRANSFER TO COURSE_TOLKIT #####


# Change the pointers to the course_toolkit.
perl -p -i -e 's!\=\"toolkit!="../course_toolkit!' *.html

# We need to add one CSS link because the background in different for each chapter.
perl -p -i -e 's%\<!-- Stylesheets Area --\>%<!-- Stylesheets Area -->\r\n  <link href="chapter_toolkit/content_header.css" rel="stylesheet" type="text/css" />%' *.html

