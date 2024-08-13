import express from 'express';
import http from "http"
import { resolve } from 'path';
import router from './router';
import Multiplayer from './socket/Multiplayer';

const app = express()

const PORT = 9090;
const server = http.createServer(app);

Multiplayer.setIO(server);

Multiplayer.conexao();

app.use("/public", express.static(resolve("./src/public")))
app.use("/assets", express.static(resolve("./src/public/assets")))
app.use("/style.css", express.static(resolve("./src/public/style.css")))
app.use(router);

server.listen(PORT, ()=>{
    console.log(`Rodando em http://localhost:${PORT}`);
})