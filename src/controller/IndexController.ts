import { resolve } from "path"
import { Request, Response } from "express"

export default class IndexController{

    public static async index(req:Request, res:Response){
        res.sendFile(resolve("./build/views/index.html"))
    }
}