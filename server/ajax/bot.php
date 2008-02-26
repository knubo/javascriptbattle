<?php
include_once ("../lib/AppConfig.php");
include_once ("../lib/DB.php");
include_once ("../lib/Brains.php");

$name = array_key_exists("name", $_REQUEST) ? $_REQUEST["name"] : "";
$action = array_key_exists("action", $_REQUEST) ? $_REQUEST["action"] : "list";

header("Content-Type: application/json");

$db = new DB();
$brains = new Brains($db);

switch ($action) {
	case "get" :
		echo $brains->getOne($name);
		break;
	case "list" :
		echo json_encode($brains->listAll());
		break;
}
?>
  