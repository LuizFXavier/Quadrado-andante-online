import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import http from "http"

export default class Multiplayer{

    private io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    private players:Player[] = []

    constructor(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){

        this.io = new Server(server);
    }

    conexao(){
        
        this.io.on("connection", (socket) => {

            socket.on("uau", n =>{
        
                console.log("N:",n);
                
            })
            socket.on("disconnecting",() =>{

                this.players = this.players.filter(e=>e.id != socket.id)
            })

            console.log(socket.id);
            
            console.log("Conectou pra caramba");


            this.players.push({
                x:Math.random()*200,
                y:Math.random()*200,
                width:50,
                height:50,
                color:`#${parseInt((Math.random()*(Math.pow(16,6) - 1)).toString()).toString(16)}`,
                id:socket.id
            })

            console.log(this.players);
            

            socket.emit("games", this.players)
            
            socket.on("atualiza", p =>{
                // console.log("p:",p);
                
                this.players = this.players.map(player =>{
                    if(p && player.id == p.id){

                        player.x = p.x;
                        player.y = p.y;
                    }
                    return player
                })

                socket.emit("atualiza", this.players)
            })
            
            socket.on("session", requiem => {

                socket.emit("session", {id:socket.id, requiem:requiem})
            })

            
        })
    }
}

export interface Player{
    x:number;
    y:number;
    width:number;
    height:number;
    color:string;
    id:string;
}