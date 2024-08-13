import {io, Socket} from "socket.io-client"
import Game from "../Game";
import Player from "../GameObject/Player";

export default class Multiplayer{

    public static socket:Socket;

    public static start(){
        Multiplayer.socket = io();

        this.socket.emit("initGame");

        this.socket.on("updatePlayers", (backPlayers, selfID) =>{

            // console.log(backPlayers);

            const bp = new Map<string, any>(backPlayers);

            bp.forEach((p: { id: string; valor:number; cor:string}) => {
                
                if(!Game.jogadores.has(p.id)){
                    Game.nPlayers += 1;
                    Game.jogadores.set(p.id, new Player(p.id, Game.nPlayers, p.valor, 0, 0, 100, 100, p.cor));
                    console.log(Game.jogadores);
                    if(p.id == selfID)
                        Game.selfPlayer = Game.nPlayers;
                    
                }
                else{
                    
                    Game.jogadores.get(p.id)!.valor = p.valor;
                }
            });

            Game.jogadores.forEach(p =>{
                if(!bp.has(p.id)){
                    Game.nPlayers -= 1;
                    Game.jogadores.delete(p.id);
                }
            })
            Game.posicionarPlayer();
        })

    }

}
