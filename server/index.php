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
    <link rel="stylesheet" type="text/css" href="server.css"/>
    <script src="server.js" type="text/javascript"></script>
    <script src="js/prototype.js" type="text/javascript"></script>
    <script src="js/scriptaculous.js" type="text/javascript"></script>

</head>
<body onload="setup();">
<div class="wrapper">
<h1 id="headquarter">JavaScript Battle Headquarter</h1>

<div id="navigbox"><a href="../src/playground.html">To arena</a>
</div>


<div id="loginbox">
	<div class="loginControlled" <?= $user ? "style='display:none;'''": "" ?>>
		User: <input id="user">Password: <input id="password" type="password">
		<input type="button" value="Log in" id="loginbutton"/>
		<input type="button" value="New user" id="newuserbutton"/><br>
	</div>
	<div class="loginControlled" <?= $user ? "" : "style='display:none;'" ?>>
		<span id="loggedinuser"><?= $user ?></span>
		<input type="button" value="Log out" id="logoutbutton">
	</div>
</div>

<div id="welcomeText" class="loginControlled" <?= $user ? "style='display:none;'":""?>>
Log in or create a user (just write in wanted username and password and hit create new user) to upload a brain to the repository. 
</div>
<div id="uploadBox" class="loginControlled" <?= $user ? "":"style='display:none;'"?>>
 <span id="uploadtext">Upload your brain to let it be used by you and others in JavaScript Battle. If you upload a brain with 
 the same name as one you already has uploaded, it will be replaced. Both name and function must be globally
unique or it will not be accepted. Please note that there is a 64000 character limit to each brain.</span>
 
 <form method="post" enctype="multipart/form-data" id="uploadform" action="upload.php">
 Brain name:<br><input id="brainname" name="brainname"><br>
 <input type="hidden" name="MAX_FILE_SIZE" value="64000" />
 File:<br><input type="file" id="brainfile" name="brainfile"><br>
  <input type="submit" value="Upload" id="uploadButton">
  </form>
</div>
<div id="brainlist">
<table>
<thead>
<tr>
<th>Brain name</th><th>Creator</th><th>Last update</th><th>Brain function</th>
</tr>
</thead>
<tbody>
<?php

foreach ($brains->listAll() as $one) {
	echo "<tr><td>" . $one["name"] . "</td><td>" . $one["owner"] . "</td><td>" .
	$one["created"] . "</td><td>" . $one["func"] . "</td></tr>";
}
?>
</tbody>
</table>
</div>
  <div class="push"><!-- --></div>
</div>

<div class="footer">Released under the GNU Pulic license V3.0 - <a href="http://code.google.com/p/javascriptbattle">Project home at Google Code</a>.</div>

</body>
</html>