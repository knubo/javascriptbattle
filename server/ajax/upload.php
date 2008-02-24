<?php


/* Does basic authentication and send back URL where the client should return. */

include_once ("../lib/AppConfig.php");
include_once ("../lib/DB.php");
include_once ("../lib/RegnSession.php");

$db = new DB();
$sess = new RegnSession($db);

$user = $sess->auth();
if(!$user) {
    echo "Not logged in";
    return;
}

$brainname = array_key_exists("brainname", $_REQUEST) ? $_REQUEST["brainname"] : "";

$bot = file_get_contents($_FILES['brainfile']['tmp_name']);

//TODO Validate that it looks like a javascript function we expect.

$prep = $db->prepare("insert into ".AppConfig :: DB_PREFIX ."brains (bot,created,name,owner) values (?,now(),?,?) on duplicate key update bot=?,created=now()");
$prep->bind_params("ssss", $bot, $brainname, $user, $bot);
$prep->execute();

header('Location: ..');?>