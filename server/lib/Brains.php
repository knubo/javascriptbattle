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
}

?>