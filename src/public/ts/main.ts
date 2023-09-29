import { io } from "socket.io-client";
import Games from "./games/Games";
import Keyboard from "./UI/Keyboard";
import Player from "./gameObject/Player";
import Caminhos from "./Caminhos";


Caminhos.socket = io()

let requiem = Math.random()

Caminhos.socket.emit("session", requiem)


Caminhos.socket.on("session", chaves =>{
    if(chaves.requiem == requiem){
        Games.sessionID = chaves.id
    }
})


const canvas = document.getElementById('canva') as HTMLCanvasElement;

Games.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


document.addEventListener("keydown", e =>{
    
    Keyboard.keydown.set(e.key, true)
    
})

document.addEventListener("keyup", e =>{
    
    Keyboard.keydown.set(e.key, false);
    
})


Caminhos.socket.on("games", players => {

    //@ts-ignore
    Games.players = players.map(p => new Player(p))
    console.log("entrou 1");
    
})

Caminhos.socket.on("atualiza", players => {

    // console.log(player);
    if (players.length > Games.players.length){
        let p = players[players.length-1];

        Games.players.push(new Player({
            x:p.x,
            y:p.y,
            width:p.width,
            height:p.height,
            color:p.color,
            id:p.id
        }))
    }
    
    for (let i = 0; i < Games.players.length; i++){
        

        if((Games.sessionID != Games.players[i].id) && (Games.players[i].id == players[i].id)){
            Games.players[i].x = players[i].x;
            Games.players[i].y = players[i].y;
            
        }
    }
    
})

const game = new Games()

game.start()