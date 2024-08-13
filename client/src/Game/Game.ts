import $ from "jquery"
import Player from "./GameObject/Player"
import Input from "./Input";

export default class Game{
    
    public static ctx:CanvasRenderingContext2D;
    public static jogadores:Map<string, Player> = new Map();
    public static selfPlayer:number;
    public static nPlayers:number = 0;

    public static render(){
        Game.ctx.fillStyle = "#0FF"
        Game.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.jogadores.forEach(value=>
            value.render()
        );
    }
    public static update(){
        this.jogadores.forEach(j=>
            j.update()
        );
    }

    public static posicionarPlayer(){
        for (let j of this.jogadores.values()){
            if(j.tag > Game.selfPlayer){
                
                j.x = (j.tag - Game.selfPlayer) * 200;
            }
            else if (j.tag < Game.selfPlayer){
                
                j.x = (j.tag + Game.nPlayers - this.selfPlayer) * 200;
            }
            
        }
    }

    public static loop(){
        Game.render();
        Game.update();

        if (Input.clicou) {
            
            Input.clicou = !Input.clicou
        }
        
        window.requestAnimationFrame(() => this.loop());
    }

    public static start(){
        const canvas = $("#canvinhas")[0] as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        
        Game.loop();
    }
}