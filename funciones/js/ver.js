function ver(indice, sql){
    this.indice=indice;
    this.sql=sql;
    this.Tablero;
    this.filas = document.getElementById("fila["+this.indice+"]").value;
    this.columnas = document.getElementById("columna["+this.indice+"]").value;
    this.adicional = document.getElementById("adicional["+this.indice+"]").value;
    this.suma = this.filas*this.columnas;
    this.img;
    this.abrir();

    document.getElementById('pFilas').innerHTML="Filas: "+this.filas;
    document.getElementById('pColumnas').innerHTML="Columnas: "+this.columnas;
}

ver.prototype.dibujar=function(){
    this.Tablero=new Tablero("myCanvas",10,10);
    this.Tablero.agregar(this.filas, this.columnas);

    if (this.adicional <= this.suma){
        this.Tablero.setLista(this.Tablero.get('x'), this.Tablero.get('y'), this.adicional);
    }else{
        alert("Valor adicional no se encuentra en los limites establecidos.");
        this.adicional = -1;
    }

    this.Tablero.dibujarTablero();
    this.generarPng(true);
    this.update();
    
    contexto.items.actualizar();
};

ver.prototype.generarPng=function(canvas){
    if (canvas) this.img = document.getElementById("myCanvas").toDataURL("image/png");
    document.getElementById("matriz").src=this.img;
    document.getElementById("imagen").href=this.img; 
    $(".emergente").show();
};

ver.prototype.update=function(){
    if (this.adicional != ""){
        document.getElementById("adicional["+this.indice+"]").disabled = true;
        var direccion = "funciones/php/consulta.php?consulta=2&id="+this.indice+"&adicional="+this.adicional+"&img="+this.img;
        $.ajax({
            url: direccion,
            success: function(data){
                if (data == 1)  alert('no se logro ingresar los datos.')
            },
            error: function(){ alert('error 404'); }
        });
    }
};

ver.prototype.updatePhp=function(){
    self = this;
    var direccion = "funciones/php/consulta.php?consulta=3&id="+this.indice;
    $.ajax({
        url: direccion,
        success: function(data){
            if (data == 1)  alert('no se logro ingresar los datos.')
            else{
                self.img = data;
                self.generarPng();
            }
        },
        error: function(){ alert('error 404'); }
    });
};

ver.prototype.abrir=function(){
    if (!this.sql){
        this.dibujar();
    }else{
        this.updatePhp();
    }
};

ver.prototype.cerrar=function(){
    $(".emergente").hide();
};