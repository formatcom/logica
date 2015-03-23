<?php
	require_once("mysqli.php");

	$instancia = new jsonPhp();

	if (isset($_GET["consulta"])){

		$select = $_GET["consulta"];
		
		switch ($select) {
		    case 0:
		        echo $instancia->items();
		        break;
            case 1:
		        echo $instancia->agregar($_GET['filas'], $_GET['columnas']);
		        break;
            case 2:
                $a = str_replace(" ", "+", $_GET['img']);
		        echo $instancia->adicional($_GET['id'], $_GET['adicional'], $a);
		        break;
            case 3:
		        echo $instancia->img($_GET['id']);
		        break;
		}
	}
?>