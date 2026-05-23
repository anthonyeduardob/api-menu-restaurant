
import { Router } from "express";
import { menuRoutes } from "./menu-routes.js";
import { Database } from "../database.js"; // Importe o tipo

// A função recebe a instância do banco de dados
export function routes(db: Database) {
    const router = Router();

    // Passa o db para o arquivo de rotas do menu
    router.use("/menu", menuRoutes(db));

    return router;
}