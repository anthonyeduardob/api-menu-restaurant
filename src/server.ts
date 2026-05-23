import express, { NextFunction, Request, Response } from "express"
import { routes } from "./routes/index.js"
import { ZodError } from "zod"
import { Database } from "./database.js"

const PORT = 3000

const app = express()
app.use(express.json())

const db = new Database();

/* RECEBER DADOS VIA FORM URLENCODED */
app.use(express.urlencoded({ extended: true }))

app.use(routes(db))

app.use(async (error: any, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof ZodError) {
        return await response
            .status(400)
            .json({ message: "Erro com dados informados!", issues: error.format() })
    }

    response.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log("Servidor rodando"))