import fs from "node:fs/promises"

const DATABASE_PATH = new URL("database.json", import.meta.url)

class Database {
    #database = {}

    constructor() {
        // INICIANDO O BD
        fs.readFile(DATABASE_PATH, "utf8").
            then((data) => {
                // SE JA EXISTIR UM BD, TRAS OS REGISTROS PARA A MEMORIA
                this.#database = JSON.parse(data)
            })
            // SE NÃO EXISTIR, É PERSISTIDO UM NOVO DB
            .catch(() => this.#persist())
    }

    async #persist() {
        // ESCREVENDO NO JSON OS DADOS
        await fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

    async insert (table: string, data: any) {
        // SE JA EXISIR UMA TABELA COM O NOME INFORMADO, É PASSADO PARA INSERIR NO ARRAY
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            // SE NAO EXISIR UMA TABELA COM O NOME INFORMADO, É INICIADO UMA NOVA E ADICIONA O PRATO
            this.#database[table] = [data]
        }

        // SALVA A ALTERACAO NO ARQUIVO JSON
        await this.#persist()
    }

    select (table: string) {
        return this.#database[table] ?? []
    }

    async delete(table: string, id: number) {
        // BUSCANDO O INCIDE DO PRATO PELO ID NOS REGISTROS
        const rowIndex = this.#database[table].findIndex((row: any) => row.id === id);
        console.log(rowIndex)

        if (rowIndex > -1) {
            // REMOVE O ITEM DO ARRAY
            //this.#database[table].splice(rowIndex, 1);

            // SALVA A ALTERACAO NO ARQUIVO JSON
            await this.#persist();
        }
    }
}

export { Database }