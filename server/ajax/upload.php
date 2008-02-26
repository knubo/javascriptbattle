<?php


/* Does basic authentication and send back URL where the client should return. */

include_once ("../lib/AppConfig.php");
include_once ("../lib/DB.php");
include_once ("../lib/RegnSession.php");

$db = new DB();
$sess = new RegnSession($db);

$user = $sess->auth();
if (!$user) {
	echo "Not logged in";
	return;
}

$brainname = array_key_exists("brainname", $_REQUEST) ? $_REQUEST["brainname"] : "";

$bot = file_get_contents($_FILES['brainfile']['tmp_name']);

preg_match("/.*function (.*)\(\)/", $bot, $func);

//TODO Validate that it looks like a javascript function we expect.

if (false) {
	echo "B:$brainname<br>";
	echo "F:";
	print_r($func);
	echo "<br>SRC:$bot<br>";
	die;
}

$prep = $db->prepare("insert into " . AppConfig :: DB_PREFIX . "brains (bot,created,name,owner, func) values (?,now(),?,?,?) on duplicate key update bot=?,created=now(),func=?");
$prep->bind_params("ssssss", $bot, $brainname, $user, $func[1], $bot, $func[1]);
$prep->execute();

header('Location: ..');
?>