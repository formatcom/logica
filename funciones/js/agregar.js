function add(){
    if ((document.getElementById("filas").value*document.getElementById("columnas").value) <= 255)
        items.agregar(document.getElementById("filas").value, document.getElementById("columnas").value);
    else alert('La multiplicacion de Filas * Columnas no puede ser mayor a 225.')
    document.getElementById("filas").value = "";
    document.getElementById("columnas").value = "";
}