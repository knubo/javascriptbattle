<?php


/*
 * Created on Jul 16, 2007
 *
 */
include_once ("../lib/AppConfig.php");
include_once ("../lib/DB.php");
include_once ("../lib/User.php");
include_once ("../lib/RegnSession.php");

header("Content-Type: application/json");


$action = "save";
$user = array_key_exists("user", $_REQUEST) ? $_REQUEST["user"] : "";
$person = 0;
$password = array_key_exists("password", $_REQUEST) ? $_REQUEST["password"] : "";
$readonly = 1;
$reducedwrite = 0;

$db = new DB();
$regnSession = new RegnSession($db);
$loggedInUser = $regnSession->auth();

if (!$user || !$password) {
	die("Must supply username and password.");
}


switch ($action) {
	case "save" :
		$res = array ();
		
		mail("knutbo@ifi.uio.no","JavascriptBattle: New user $user","");

		if (strcmp($loggedInUser, $user) == 0) {
			$accUsers = new User($db);
			$rowsAffected = $accUsers->updatePassword($user, $password);
			$res["result"] = $rowsAffected;
		} else {
			$accUsers = new User($db);

			if ($accUsers->exist($user)) {
				$res["taken"] = 1;

			} else {
				$rowsAffected = $accUsers->save($user, $password, $person, $readonly, $reducedwrite);
				$res["result"] = $rowsAffected;
			}

		}

		echo json_encode($res);
		break;
}
?>
