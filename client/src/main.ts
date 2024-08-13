import $ from "jquery"
import Multiplayer from "./Game/Connection/Multiplayer";
import Game from "./Game/Game";
import Input from "./Game/Input";
Multiplayer.start()
Game.start()

$("#canvinhas").on("click", (e) =>{

    Input.clicou = e.button == 0;
    console.log("Clicou");
    
  })
  
  $("#canvinhas").on("mousemove", (e) =>{
  
    Input.x = e.clientX;
    Input.y = e.clientY;
    
  })