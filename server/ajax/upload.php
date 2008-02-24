<?php


/* Does basic authentication and send back URL where the client should return. */

include_once ("../lib/AppConfig.php");
include_once ("../lib/DB.php");
include_once ("../lib/RegnSession.php");

$db = new DB();
$sess = new RegnSession($db);

if(!$sess->auth()) {
    echo "Not logged in";
    return;
}



?>
Jubi jubi