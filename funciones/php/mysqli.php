<?php

class jsonPhp{

	private $mysqli, $lista = array();

	public function __construct() {
		$this->mysqli = new mysqli("localhost", "root", "", "matriz");

		/* verificar la conexión */
		if (mysqli_connect_errno()) {
    		printf("Conexión fallida: %s\n", mysqli_connect_error());
    		exit();
		}
	}

	public function items(){
		$query = "SELECT * FROM lista ORDER by ID DESC";
		if ($result = $this->mysqli->query("SELECT * FROM lista ORDER by ID DESC")) {
	    	/* obtener array asociativo */
		    while ($row = $result->fetch_array(MYSQLI_BOTH)) {
	    	    $this->lista[$row[0]-1] = array($row[1],$row[2], $row[3]);
	    	}

	    	return json_encode($this->lista);
	    	/* liberar el resultset */
	    	$result->free();
		}
	}

	public function agregar($filas, $columnas){
		$query = "INSERT INTO lista (filas, columnas) VALUES ('$filas','$columnas')";
		if ($result = $this->mysqli->query($query)) {
		}else return 1;
	}

	public function adicional($id, $valor, $img){
		$query = "UPDATE lista SET adicional='$valor', img='$img' WHERE id='$id'";
		if ($result = $this->mysqli->query($query)) {
		}else return 1;
	}

    public function img($indice){
		$query = "SELECT img FROM lista WHERE id='$indice'";
		if ($result = $this->mysqli->query($query)) {
            while ($row = $result->fetch_array(MYSQLI_BOTH)) {
	    	    return $row['img'];
	    	}
		}else return 1;
	}

	public function cerrar(){
		$this->mysqli->close();
	}
}
?>
