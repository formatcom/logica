function Tablero(idCanvas, anchoCelda, altoCelda){
    this.canvas=document.getElementById(idCanvas);
    this.contexto=this.canvas.getContext('2d');
        
    this.lista = [];
    
    this.anchoCelda=anchoCelda;
    this.altoCelda=altoCelda;
    
    this.filas = filas;
    this.columnas = columnas;
    
    this.conjuntoTiles=[
        new Tile(this.anchoCelda,this.altoCelda,"-","white"),
        new Tile(this.anchoCelda,this.altoCelda,"+","white")
    ];
    
    this.tablero= [];
}

Tablero.prototype.agregar=function(filas, columnas){
    
    this.filas = filas;
    this.columnas = columnas;
    
    for (var yi=0;yi<this.filas;yi++){
        this.tablero[yi]= [];
        for (var xi=0;xi<this.columnas;xi++){
            this.tablero[yi][xi] = 0;
        }
    }
    
    this.canvas.width=this.anchoCelda*this.tablero[0].length;
    this.canvas.height=this.altoCelda*this.tablero.length;
}

Tablero.prototype.set=function(x, y, valor){
    this.tablero[y][x] = valor;
}

Tablero.prototype.random=function(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

Tablero.prototype.get=function(atributo){
    switch(atributo){
        case "x":
            return this.tablero.length;
        case "y":
            return this.tablero[0].length;
    }
}

Tablero.prototype.setLista=function(xi, yi, indice){
    
    var temp;
    
    for (y = 0; y < yi ; y++){
        for (x = 0; x < xi ; x++){
            this.lista.push([y, x]);
        }
    }
    
    for (i = 0; i < indice ; i++){
        temp = this.random(0, this.lista.length);
        this.set(this.lista[temp][0], this.lista[temp][1], 1);
        this.lista.splice(temp,1);
    }  
}

Tablero.prototype.dibujarTablero=function(){
    var y=this.tablero.length;
    var x=this.tablero[0].length;
    for (var yi=0;yi<y;yi++){
        for (var xi=0;xi<x;xi++){
            this.conjuntoTiles[this.tablero[yi][xi]].dibujar(this.contexto,xi,yi);
        }
    }
};