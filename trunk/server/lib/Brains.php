<?php

class Brains {
	private $db;
	
	function Brains($dbi) {
		$this->db = $dbi;
	}
	
	function listAll() {
		$prep = $this->db->prepare("select created, name, owner from ".AppConfig :: DB_PREFIX ."brains");
		
		return $prep->execute();
	}

	function getOne($name) {
	    $prep = $this->db->prepare("select bot from ".AppConfig :: DB_PREFIX ."brains where name=?");
	    $prep->bind_params("s", $name);
	    $res = $prep->execute();
	    $one = array_shift($res);
	    return $one['bot'];
    }	
}

?>