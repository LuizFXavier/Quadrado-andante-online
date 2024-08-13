import type Player from "../Game/Player"

export interface ServerToClientEvents {
    updatePlayers:(data:any, selfID:string) => void
}

export interface ClientToServerEvents {
    
    initGame:() =>void
    cliqueCarta:(id:string) =>void;
    cliqueInimigo:(id:string) =>void;
}

export interface InterServerEvents {

}

export interface SocketData {
    
}