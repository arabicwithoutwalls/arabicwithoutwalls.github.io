<html>
<?php

if ($_GET[upper] == "yes") {
echo '<a href="#" onclick="top.counter--;top.lower.location=top.files[top.counter];document.getElementById('."'file'".').innerHTML=top.files[top.counter++];return false;">Previous</a> | ';
echo '<a href="#" onclick="top.counter++;top.lower.location=top.files[top.counter];document.getElementById('."'file'".').innerHTML=top.files[top.counter++];return false;">Next</a>';
echo '<div id="file"></div>';
}

else {

$files = array();

if ($handle = opendir('.')) {

    /* This is the correct way to loop over the directory. */
    while (false !== ($file = readdir($handle))) {
        if (substr($file,-4) == 'html') {
          $files[count($files)] = "$file";
        }
    }

    closedir($handle);
}

echo '<script language="javascript">';
echo 'var counter = 0;';
echo 'var files = new Array();';
foreach ($files as $file) {
  echo "\r\nfiles[files.length] = '$file';";
}
echo "</script>";

?>
<frameset rows="10%,80%*">
  <frame name="upper" src="tmp.php?upper=yes">
  <frame name="lower" src="template.html">
</frameset>
<?php
}
?>
</html>