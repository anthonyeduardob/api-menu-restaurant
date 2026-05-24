
import { Router } from "express";
import { MenuController } from "../controllers/menu-controller.js";
import { setIdMiddleware } from "../middleware/setid-middleware.js";
import { Database } from "../database.js";

// A função recebe a instância do banco de dados
export function menuRoutes(db: Database) {
    const routes = Router();

    // Passa o db para o Controller
    const menuController = new MenuController(db);
    // RETORNO DE TODOS OS ITENS
    routes.get("/", (request, response) => menuController.index(request, response));

    // RETORNO DE UM ITEM ESPECIFICO
    routes.get("/:id", (request, response) => menuController.show(request, response));

    // CRIACAO DE UM ITEM (DEFINIFININDO O ID PELO MIDDLEWARE)
    routes.post("/", setIdMiddleware(db), (request, response, next) => menuController.create(request, response, next));

    // REMOCAO DE UM ITEM ESPECICO
    routes.delete("/:id", (request, response, next) => menuController.remove(request, response, next));

    return routes;
}