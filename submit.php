<?php	include("includes/forms.php");

if($_SERVER['HTTPS'] != 'on') // need to do https
{
	$action = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	echo '<html><body><form id="mainform" action="' . $action . '" method="post">';
	foreach($_POST as $key => $value)
		if(($key != 'nosave_username') && ($key != 'nosave_password'))
			echo "<input name=\"$key\" type=\"hidden\" value=\"$value\"/>\n";
	if(!isset($_POST['referer']))
		echo '<input name="referer" type="hidden" value="'. $_SERVER['HTTP_REFERER'] . "\" />\n";
	echo '<script type="text/javascript">
	var form = document.getElementById(\'mainform\');
	form.submit();
	</script>';
	die('</form></body></html>');
}

# Connect to database
mysql_connect("localhost", "aww");
mysql_select_db("aww");

$valid = enforce_login('user_info',
	$_POST['nosave_username'],
	$_POST['nosave_password']);

if ($valid && isadmin('user_info', $validated_uid))
	die("You are logged in as an admin.\n");
else if($valid)
{

	//echo '<pre>'; var_dump($_POST); echo '</pre>';
	$result = mysql_query('select * from user_info where uid=\'' . $validated_uid . "'");

	$userinfo = mysql_fetch_array($result);

	if(!isset($_POST['referer'])) // this means it did not come from login.php
		$_POST['referer'] = $_SERVER['HTTP_REFERER'];
	
	$chapter = preg_replace('/.*\/([^\/].*)\/.*/', '${1}', $_POST['referer']);
	$chapter = preg_replace('/(chapter)([0-9]*)/', '${1} ${2}', $chapter); // chapter12 => chapter 12
	$uniqueQuiz = preg_replace('/[^a-z]*$/', '', $_POST['referer']); // strips off the extension
	
	$quizName = preg_replace('/.*\//', '', $_POST['referer']); // strips off the path
	$quizName = preg_replace('/\..*/', '', $quizName); // strips off the extension
	$quizName = preg_replace('/ch[0-9]*/', '', $quizName); // gets rid of ch12 at start
	$quizName = preg_replace('/_quiz/', '', $quizName); // gets rid of _quiz at end

	$result = mysql_query("select count(*) from submits where uid='$validated_uid' and quiz='" . htmlentities($uniqueQuiz) . "'");
	$submitInfo = mysql_fetch_array($result);
	if($submitInfo[0] != 0)
		die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
		<html>
		<head>
		<title>Quiz already submitted</title>
		</head>
		<body>
		<p>Your quiz has been already been submitted. You can only submit once.</p>
		<p><a href="' . $_POST['referer'] . '">Return to quiz</a>
		<br><a href="logout.php">Log out</a>
		<br><a href="/">Front page</a></p>
		</body></html>');
	$numQuestions = 0.0;
	$numCorrect = 0.0;
	$correctArray = array();
	$responseArray = array();

	foreach($_POST as $name => $value)
		if((strpos($name, 'select') === 0) && (strpos($name, 'response') === false))
		{
			$numQuestions++;
			if(strcmp($value, 'right') === 0)
				$numCorrect++;
			array_push($correctArray, $value);
		}
		elseif(strpos($name, 'response') !== false)
			array_push($responseArray, $value);

	if(count($correctArray) !== count($responseArray))
		die("Invalid submission.");

	if($numQuestions == 0) // no responses means no email
		die('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
		<html>
		<head>
		<title>No submission</title>
		</head>
		<body>
		<p>You have not submitted anything.
		<br><a href="logout.php">Log out</a>
		<br><a href="/">Front page</a></p>
		</body></html>');

	$percentage = ($numCorrect/$numQuestions) * 100;

	$percentage = preg_replace('/(\.[0-9]{2})[0-9]*/', '${1}', $percentage); // strips off everything after 2 periods

	mysql_query("insert into submits values(NULL, '$validated_uid', '" . mysql_real_escape_string($uniqueQuiz) . "', $percentage, NULL)");

	echo mysql_error();

	$body = "Arabic Without Walls\n\nStudent " . $userinfo['name'] . " has received a score of $percentage% on the $chapter $quizName quiz. \nThe answers were:\n";
	for($i = 0; $i < count($correctArray); $i++)
		$body.= ($i+1) . "\t" .  $correctArray[$i] . "\t" . $responseArray[$i] . "\n";

	// mail score and answers to teacher
	mail('shiri@berkeley.edu', htmlentities("AWW $chapter $quizName quiz results"), htmlentities($body), "From: uccllt@ucdavis.edu");
	mail('mahatu@hotmail.com', htmlentities("AWW $chapter $quizName quiz results"), htmlentities($body), "From: uccllt@ucdavis.edu");

	$body = "Arabic Without Walls\n" . $userinfo['name'] . "\nYou have received a score of $percentage% on the $chapter $quizName quiz.\n";
	
	//mail score to student
	mail($userinfo['email'], htmlentities("AWW $chapter $quizName quiz results "), htmlentities($body), "From: uccllt@ucdavis.edu");

	$action = "http://".$_SERVER['HTTP_HOST'];

	echo  '
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
	<html>
	<head>
	<title>Quiz submitted</title>
	</head>
	<body>';
	echo "\n<p>Your quiz has been submitted. Your score was $percentage%</p>\n";
	echo '<p><a href="' . $_POST['referer'] . '">Return to quiz</a>
	<br><a href="logout.php">Log out</a>
	<br><a href="' . $action . '">Front page</a></p>
	</body></html>';
}
else
{
	echo '<html><body><form id="mainform" action="login.php" method="post">';
	foreach($_POST as $key => $value)
		if(($key != 'nosave_username') && ($key != 'nosave_password'))
			echo "<input name=\"$key\" type=\"hidden\" value=\"$value\"/>\n";
	if(!isset($_POST['referer']))
		echo '<input name="referer" type="hidden" value="'. $_SERVER['HTTP_REFERER'] . "\" />\n";
	echo '<script type="text/javascript">
	var form = document.getElementById(\'mainform\');
	form.submit();
	</script>';
	echo '</form></body></html>';
}
?>
