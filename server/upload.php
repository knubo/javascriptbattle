<?php


/* Does basic authentication and send back URL where the client should return. */

include_once ("lib/AppConfig.php");
include_once ("lib/DB.php");
include_once ("lib/RegnSession.php");

$db = new DB();
$sess = new RegnSession($db);

$user = $sess->auth();
if (!$user) {
	echo "Not logged in";
	return;
}

$brainname = array_key_exists("brainname", $_REQUEST) ? $_REQUEST["brainname"] : "";

$bot = file_get_contents($_FILES['brainfile']['tmp_name']);

$errors = array();

preg_match("/.*function (.*)\(\)/", $bot, $func);

if (strpos($bot, "boardInfo") === FALSE) {
	array_push($errors,"Failed to find function <code>boardInfo(y,x)</code>.");
} 

if(strpos($bot, "decide") === FALSE) {
	array_push($errors,"Failed to find function <code>decide(mybot)</code>.");	
}

if(strpos($bot, "radar") === FALSE) {
	array_push($errors,"Failed to find function <code>radar(observedBots)</code>.");	
}

if(strpos($bot, "blocked") === FALSE) {
	array_push($errors,"Failed to find function <code>blocked()</code>.");	
}

if(strpos($bot, "hurt") === FALSE) {
	array_push($errors,"Failed to find function <code>hurt(shootingBot)</code>.");	
}

if(strpos($bot, "hit") === FALSE) {
	array_push($errors,"Failed to find function <code>hit(hurtBot)</code>.");	
}

if (!$func || !strlen($func)) {
	array_push($errors,"Failed to find defining class. Expects <code>function BotBrainName()</code> in start of file");
}

if (false) {
	echo "B:$brainname<br>";
	echo "F:";
	print_r($func);
	echo "<br>SRC:$bot<br>";
	die;
}

if(count($errors) > 0) {
	?>
	<html>
	<head>
	<link rel="stylesheet" type="text/css" href="server.css"/>
	<title>Brain rejected</title>
	</head>
	<body>
	<h1 class="bigerror">Brain Rejected</h1>
	<p>Your brain function was not accepted. The following <?= (count($errors) > 1) ?  "errors":"error" ?> were found:</p>
	<ul id="errorlist">
	<li><span class="errortext"><?= implode("</span>\n<li><span class=\"errortext\">", $errors)?></span>
	</ul>
	<p><a href="index.php">Back to headquarters</a>.
	</p>	
	</body>
	</html>
	<?
	die;
}

mail("knutbo@ifi.uio.no","JavascriptBattle: New bot from $user - $brainname","");

$prep = $db->prepare("insert into " . AppConfig :: DB_PREFIX . "brains (bot,created,name,owner, func) values (?,now(),?,?,?) on duplicate key update bot=?,created=now(),func=?");
$prep->bind_params("ssssss", $bot, $brainname, $user, $func[1], $bot, $func[1]);
$prep->execute();

header('Location: index.php');
?>