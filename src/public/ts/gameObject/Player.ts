import Caminhos from "../Caminhos";
import Keyboard from "../UI/Keyboard";
import Games from "../games/Games";

export default class Player{
    
    private lastPos = {x:0, y:0}
    x:number;
    y:number;
    width:number;
    height:number;
    color:string;
    id:string;
    speed:number = 2;

    constructor(p:{x:number, y:number, width:number, height:number, color:string, id:string}){

        this.x = p.x;
        this.y = p.y;
        this.width = p.width;
        this.height = p.height;
        this.color = p.color;
        this.id = p.id;

        console.log(this);
        
    }
    
    update(){
        // console.log(this.x, this.y);
        
        this.move()
    }
    
    drawn(){
        Games.ctx.fillStyle = this.color
        Games.ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    move(){

        if(Games.sessionID != this.id){
            return
        }

        this.lastPos.x = this.x
        this.lastPos.y = this.y

        if(Keyboard.keydown.get("w")){
            this.y -= this.speed
        }
        if(Keyboard.keydown.get("s")){
            this.y += this.speed
        }
        if(Keyboard.keydown.get("a")){
            this.x -= this.speed
        }
        if(Keyboard.keydown.get("d")){
            this.x += this.speed
        }

        // if (this.lastPos.x != this.x || this.lastPos.y != this.y){
        //     Caminhos.socket.emit("atualiza", this)

        // }
    }
}