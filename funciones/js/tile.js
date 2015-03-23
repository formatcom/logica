function Tile(ancho, alto, signo, color){
    this.ancho=ancho;
    this.alto=alto;
    this.signo=signo;
    this.color=color;
}

Tile.prototype.dibujar=function(contexto,x,y){
    contexto.fillStyle = "#444";
    contexto.fillRect(this.ancho*x,this.alto*y,this.ancho,this.alto);
    contexto.fillStyle = this.color;
    contexto.fillRect(this.ancho*x+1,this.alto*y+1,this.ancho-2,this.alto-2);
    contexto.fillStyle = "#000";
    contexto.font = 'bold 8px arial';
    contexto.fillText(this.signo, this.ancho*x+3,this.alto*y+8,this.ancho-2,this.alto-2);
};