<?php
include_once ("lib/AppConfig.php");
include_once ("lib/User.php");
include_once ("lib/RegnSession.php");
include_once ("lib/DB.php");
include_once ("lib/Brains.php");

$db = new DB(1);
$regnSession = new RegnSession($db);
$user = $regnSession->auth();
$brains = new Brains($db);
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
 Brain name:<input id="brainname" name="brainname"><br>
 <input type="hidden" name="MAX_FILE_SIZE" value="64000" />
 File: <input type="file" id="brainfile" name="brainfile"><br>
  <input type="submit" value="Upload" id="uploadButton">
  </form>
</div>
<div id="brainlist">
<table>
<thead>
<tr>
<th>Brain name</th><th>Creator</th><th>Last update</th>
</tr>
</thead>
<tbody>
<?php
  foreach($brains->listAll() as $one) {
  	 echo "<tr><td>".$one["name"]."</td><td>".$one["owner"]."</td><td>".$one["created"]."</td></tr>";
  }
?>
</tbody>
</div>

</body>
</html>