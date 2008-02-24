<?php
include_once ("lib/AppConfig.php");
include_once ("lib/User.php");
include_once ("lib/RegnSession.php");
include_once ("lib/DB.php");

$db = new DB(1);
$regnSession = new RegnSession($db);
$user = $regnSession->auth();
?>
<html>
<head>
    <script src="server.js" type="text/javascript"></script>
</head>
<body>

<h1 id="headquarter"><span id="headqurterspan">JavaScript Battle Headquarter</span></h1>
<div id="loginbox">
	<div id="login" <?= $user ? "style='display:none;'''": "" ?>>
	User: <input id="user"> Password: <input id="password"><input type="button" value="Log in" id="loginbutton">
	</div>
	<div id="logout" <?= $user ? "" : "style='display:none;'" ?>>
	<?= $user ?>
	<input type="button" value="Log out">
	</div>
</div>

</body>
</html>