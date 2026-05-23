# 🍕 CARDAPIO API

API REST para gerenciamento de itens de cardápio.

Scripts necessario para executar a API
- npm install
- npm run dev

**Base URL:** `http://localhost:3000`

---

## Endpoints

### GET `/menu`
Retorna todos os itens do cardápio.

**Request**
```
GET http://localhost:3000/menu
```

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "nome": "Bolonesa",
    "preco": 30,
    "descricao": "Pizza prepara no forno a lenha.",
    "categoria": "Massas",
    "ingredientes": "Molho de tomate, mussarela, frango",
    "img": "pizza.png"
  }
]
```

---

### GET `/menu/:id`
Retorna um item específico pelo ID.

**Request**
```
GET http://localhost:3000/menu/2
```

| Header   | Valor              |
|----------|--------------------|
| `Accept` | `application/json` |

**Response `200 OK`**
```json
{
  "id": 2,
  "nome": "...",
  "preco": 0,
  "descricao": "...",
  "categoria": "...",
  "ingredientes": "...",
  "img": "..."
}
```

**Response `404 Not Found`** — item não encontrado.

---

### POST `/menu`
Cria um novo item no cardápio.

**Request**
```
POST http://localhost:3000/menu
Content-Type: application/json
```

**Body**
```json
{
  "nome": "Bolonesa",
  "preco": 30,
  "descricao": "Pizza prepara no forno a lenha.",
  "categoria": "Massas",
  "ingredientes": "Molho de tomate, mussarela, frango",
  "img": "pizza.png"
}
```

| Campo          | Tipo     | Descrição                  |
|----------------|----------|----------------------------|
| `nome`         | `string` | Nome do item               |
| `preco`        | `number` | Preço em reais             |
| `descricao`    | `string` | Descrição do item          |
| `categoria`    | `string` | Categoria (ex: "Massas")   |
| `ingredientes` | `string` | Lista de ingredientes      |
| `img`          | `string` | Nome do arquivo de imagem  |

**Response `201 Created`** — retorna o item criado com o `id` gerado.

---

### DELETE `/menu/:id`
Remove um item do cardápio pelo ID.

**Request**
```
DELETE http://localhost:3000/menu/4
```

**Response `200 OK`** — item removido com sucesso.  
**Response `404 Not Found`** — item não encontrado.

---

## Resumo dos Endpoints

| Método   | Rota         | Descrição              |
|----------|--------------|------------------------|
| `GET`    | `/menu`      | Lista todos os itens   |
| `GET`    | `/menu/:id`  | Busca um item por ID   |
| `POST`   | `/menu`      | Cria um novo item      |
| `DELETE` | `/menu/:id`  | Remove um item por ID  |
