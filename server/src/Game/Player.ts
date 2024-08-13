export default class Player{
    
    id:string;
    valor:number = 0;
    cor:string;
    constructor(id:string){
        this.id = id;
        this.cor = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    }
}