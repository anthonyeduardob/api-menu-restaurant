import { Request, Response, NextFunction } from "express";
import { Database } from "../database.js"
import { IDish } from "../types/dish.js";
import { z } from "zod";

//const db = new Database();

class MenuController {
    private db: Database; // Propriedade privada
    private table: string; // Propriedade privada

    // Construtor que recebe a instância do banco
    constructor(database: Database) {
        this.db = database;
        this.table = "menu";
    }

    /* 
     * Metodo GET para listar todos os registros
     */
    index(request: Request, response: Response) {
        // RECUPERANDO TODOS OS DADOS DO BD PARA EXIBIR AO CLIENTE
        const cardapio = this.db.select(this.table)

        response.json(cardapio)
    }

    /* 
     * Metodo GET para listar um registro especifico
     */
    show(request: Request, response: Response) {
        // RECEBENDO O ID O PRATO
        const { id } = request.params;
        const idNumber = Number(id);

        // FILTRANDO OS NOS REGISTROS PELO ID INFORMADO
        const pratoSearch = this.db.select(this.table).filter((prato: IDish) => {
            return prato.id === idNumber
        })

        // SE NAO HOUVER NENHUM PRATO COM O ID INFORMADO SERA RETORNO O AVISO PARA O CLIENTE
        if (pratoSearch.length === 0) {
            return response.status(200).json({ message: `Nenhum prato cadastrado com o ID: ${id}`})
        }

        return response.status(200).json(pratoSearch)
    }

    /* 
     * Metodo POST para salvar um registro
     */
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            // DEFININDO PARAMETROS DE VALIDACAO
            const bodySchema = z.object({
                id: z.number().optional(),
                nome: z
                    .string({ required_error: "Nome é obrigatório"})
                    .min(5, { message: "Nome precisa ter no minimo 5 ou mais caracteres"}),
                preco: z
                    .number({ required_error: "Preço é obrigatório" })
                    .positive({ message: "Preço deve ser positivo" })
                    .gte(0, { message : "Preço deve ser maior que 0"}),
                descricao: z
                    .string({ required_error: "Descrição é obrigatório"})
                    .min(5, { message: "Descrição precisa ter no minimo 5 ou mais caracteres"}),
                categoria: z
                    .string({ required_error: "Categoria é obrigatório"})
                    .min(5, { message: "Nome precisa ter no minimo 5 ou mais caracteres"}),
                ingredientes: z
                    .string({ required_error: "Ingredientes é obrigatório"})
                    .min(5, { message: "Ingredientes precisa ter no minimo 5 ou mais caracteres"}),
                img: z
                    .string({ required_error: "Imagem é obrigatório"}),
            })

            const data: IDish = request.body

            // VALIDANDO OS DADOS RECEBIDOS
            const dataParsed = bodySchema.parse(data)
            
            // INSERINDO NO BANCO DE DADOS
            await this.db.insert(this.table, dataParsed)
            
            return response.status(201).json({ message: "Prato cadastrado com sucesso"})
        } catch (error) {
            // FORÇA A PASSAGEM DO ERRO PARA QUE CHEGUE ATE O TRATAMENTO DO SERVIDOR
            next(error)
        }
    }

    /* 
     * Metodo DELETE para remover um regsitro especifico
     */
    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            // DEFININDO PARAMETROS DE VALIDACAO
            const bodySchema = z.object({
                id: z.string({ required_error: "ID é obrigatório" }),
            })
            
            const data = request.params;

            // VALIDANDO O ID 
            const dataParsed = bodySchema.parse(data)

            // REMOVENDO DO BANCO DE DADOS
            const wasDeleted = await this.db.delete(this.table, Number(dataParsed.id))

            // SE O ID NAO EXISTIR, RETORNA O AVISO PARA O CLIENTE
            if (!wasDeleted) {
                return response.status(404).json({ message: `Nenhum prato encontrado com o ID: ${dataParsed.id}`})
            }

            return response.status(200).json({ message: "Prato removido com sucesso!"})
        } catch (error) {
            // FORÇA A PASSAGEM DO ERRO PARA QUE CHEGUE ATE O TRATAMENTO DO SERVIDOR
            next(error)
        }
    }
}

export { MenuController }