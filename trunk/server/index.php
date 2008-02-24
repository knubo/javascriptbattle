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
    <script src="js/prototype.js" type="text/javascript"></script>
    <script src="js/scriptaculous.js" type="text/javascript"></script>

</head>
<body onload="setup();">

<h1 id="headquarter"><span id="headqurterspan">JavaScript Battle Headquarter</span></h1>
<div id="loginbox">
	<div class="loginControlled" <?= $user ? "style='display:none;'''": "" ?>>
	User: <input id="user"> Password: <input id="password" type="password"><input type="button" value="Log in" id="loginbutton">
	</div>
	<div class="loginControlled" <?= $user ? "" : "style='display:none;'" ?>>
	<span id="loggedinuser"><?= $user ?></span>
	<input type="button" value="Log out" id="logoutbutton">
	</div>
</div>

<div class="loginControlled" <?= $user ? "":"style='display:none;'"?>>
 <form method="post" enctype="multipart/form-data" id="uploadform" action="ajax/upload.php">
 Brain name:<input id="brainname"><br>
 File: <input type="file" id="file"><br>
  <input type="button" value="Upload" id="uploadButton">
  </form>
</div>

</body>
</html>