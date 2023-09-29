import express, { Router } from "express";
import { resolve } from "path";
import { Server } from "socket.io";
import http from "http"
import router from "./router";
import Multiplayer from "./socket/Multiplayer";

const PORT = 9090

const app = express()

const server = http.createServer(app)

const multiJogo = new Multiplayer(server)

multiJogo.conexao()

app.use("/public", express.static(resolve("./build/public")))

app.use(router)

server.listen(PORT, () =>{
    console.log(`Rodando na porta ${PORT}`);
    
})  