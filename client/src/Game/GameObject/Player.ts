import Multiplayer from "../Connection/Multiplayer";
import Game from "../Game";
import Input from "../Input";
import Collision from "../Math/Collision";

export default class Player{
    id:string;
    tag:number;
    valor:number;
    x:number;
    y:number;
    width:number;
    height:number;
    cor:string;

    constructor(id:string, tag:number,valor:number, x:number, y:number, width:number, height:number, cor:string){
        this.id = id;
        this.tag = tag;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.valor = valor;
        this.cor = cor;
    }

    render(): void {
        Game.ctx.fillStyle = this.cor;
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
        Game.ctx.fillStyle = "#000";
        Game.ctx.font = '48px Arial';
        Game.ctx.fillText(this.valor.toString(), this.x + 20, this.y + 50, this.width);
    }

    update(){
        if(Collision.rectangleCollision(this, Input) && Input.clicou){
            console.log("Clicadissimo");
            
            if(this.tag == Game.selfPlayer)
                Multiplayer.socket.emit("cliqueCarta", this.id);
            else
                Multiplayer.socket.emit("cliqueInimigo", this.id);
        }
        
    }
}