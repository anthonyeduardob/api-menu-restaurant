import { NextFunction, Request, Response } from "express";
import { Database } from "../database.js";

const db = new Database();

export function setIdMiddleware(db: Database) {
    return function (request: Request, response: Response, next: NextFunction) {
        // RECUPERAR OS REGISTRO SALVOS
        const cardapio = db.select("menu");

        // GERAR UM NOVO ID COM BASE NOS ID CADASTRADOS
        const id = cardapio.length > 0 ? Number(cardapio[cardapio.length - 1].id) + 1 : 1;
        
        request.body.id = id

        return next()
    }
}