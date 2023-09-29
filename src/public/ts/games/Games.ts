import Caminhos from "../Caminhos";
import Player from "../gameObject/Player";
import Keyboard from "../UI/Keyboard";

export default class Games{

    public static ctx: CanvasRenderingContext2D;
    public static sessionID:string;

    public static players:Player[] = []

    update(){
        Games.players.forEach(p =>{
            p.update();
        })

        
    }
    render(){

        Games.ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

        Games.players.forEach(p =>{
            p.drawn();
        })
        
    }

    loop(){
        this.render()
        this.update()

        // console.log("cliente:",Games.players);
        

        window.requestAnimationFrame(() => this.loop());

        Caminhos.socket.emit("atualiza", Games.players.filter(p => p.id == Games.sessionID)[0])

    }

    start(){

        this.loop()

    }
}