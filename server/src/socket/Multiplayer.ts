import {Server, Socket} from "socket.io"
import type {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData} from "./ServerEvents"
import http from "http"
import Player from "../Game/Player";

export default class Multiplayer{
    
    private static socketList:Socket[] = [];
    private static jogadores:Map<string, Player> = new Map();

    private static io:Server<ClientToServerEvents,
                             ServerToClientEvents, 
                             InterServerEvents, 
                             SocketData>;

    public static setIO(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){
        this.io = new Server(server);
    }

    public static conexao(){
        
        this.io.on("connection", socket =>{
            console.log("Nova conexão");
            
            let mapArray = Array.from(this.jogadores)
            socket.emit("updatePlayers", mapArray, socket.id);

            socket.on("initGame", ()=>{

                console.log("Jogo iniciado");
                
                this.jogadores.set(socket.id, new Player(socket.id));
                console.log(this.jogadores)
                mapArray = Array.from(this.jogadores)
                socket.emit("updatePlayers", mapArray, socket.id);
            })
            
            socket.on("disconnect", message =>{
                console.log(socket.id + " desconectou");
                this.jogadores.delete(socket.id);

                mapArray = Array.from(this.jogadores)
                socket.emit("updatePlayers", mapArray, socket.id);
            })

            socket.on("cliqueCarta", id=>{

                if(this.jogadores.has(id))
                    this.jogadores.get(id)!.valor +=1;
                
                socket.emit("updatePlayers", mapArray, socket.id);
            })

            socket.on("cliqueInimigo", id=>{

                if(this.jogadores.has(id))
                    this.jogadores.get(id)!.valor -=1;
                
                socket.emit("updatePlayers", mapArray, socket.id);
            })
            

            setInterval(()=>{
                mapArray = Array.from(this.jogadores)
                socket.emit("updatePlayers", mapArray, socket.id);
            }, 15)
        })
    }
}