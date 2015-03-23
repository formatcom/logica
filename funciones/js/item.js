function item(indice){
    if (indice > 0) this.indice=indice;
    else this.indice = 1;
    this.filas;
    this.columnas;
    this.Repite = [];
    this.lista = [];
    this.ver;
}

item.prototype.repite=function(valor){
    for (var i=0;i<this.Repite.length;i++){
        if (valor == this.Repite[i]){
            return true;
        }
    }
    return false;
}

item.prototype.getVer=function(){
    return this.ver;
}

item.prototype.actualizar=function(){
    this.indice = 1;
    this.lista = [];
    this.Repite = [];
    document.getElementById('lista').innerHTML="";
    this.php();
}

item.prototype.setVer=function(valor){
    this.ver = valor;
}

item.prototype.php=function(){
    var direccion = "funciones/php/consulta.php?consulta=0";
    self = this;
    $.ajax({
        url: direccion,
        dataType: 'JSON',
        success: function(data){
            for(var i in data)
                self.lista.push(data[i]);
            
            for (i = 0; i<self.lista.length; i++){
                self.agregar(self.lista[i][0],self.lista[i][1],self.lista[i][2], true);
            }
        },
        error: function(){ alert('error 404'); }
    });
}

item.prototype.phpInsertar=function(filas, columnas){
    var direccion = "funciones/php/consulta.php?consulta=1&filas="+filas+"&columnas="+columnas;
    $.ajax({
        url: direccion,
        success: function(data){
            if (data == 1)  alert('no se logro ingresar los datos.')
        },
        error: function(){ alert('error 404'); }
    });
}

item.prototype.agregar=function(filas, columnas, adicional, sql){
    
    if (!adicional) adicional = -1;
    
    if (filas > 1) this.filas=filas;
    else this.filas = 1;

    if (columnas > 1) this.columnas=columnas;
    else this.columnas = 1;
    
    if (!this.repite("["+this.filas+", "+this.columnas+"]")){
        
        this.Repite.push("["+this.filas+", "+this.columnas+"]");
        
        if (!sql) this.phpInsertar(this.filas, this.columnas);
        
        if (adicional != -1){ 
            $("#lista").prepend("<div class=\"item\"><input class=\"campo0\" id=\"fila["+this.indice+"]\" value=\""+this.filas+"\" disabled/><input class=\"campo1\" id=\"columna["+this.indice+"]\" value=\""+this.columnas+"\" disabled/><input class=\"adicional\" id=\"adicional["+this.indice+"]\" value=\""+adicional+"\" disabled/><a href=\"javascript:items.setVer(new this.ver("+this.indice+", true))\"><div class=\"ver\">VER</div></a></div>");
        }else{
            $("#lista").prepend("<div class=\"item\"><input class=\"campo0\" id=\"fila["+this.indice+"]\" value=\""+this.filas+"\" disabled/><input class=\"campo1\" id=\"columna["+this.indice+"]\" value=\""+this.columnas+"\" disabled/><input class=\"adicional\" id=\"adicional["+this.indice+"]\" /><a href=\"javascript:items.setVer(new this.ver('"+this.indice+"'))\"><div class=\"ver\">VER</div></a></div>");
        }
        this.indice++;
        
    }else alert('Matriz asignada anteriormente.');
};  