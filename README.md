# API de Eventos com Node.js e MongoDB

Uma API RESTful para gerenciamento de eventos, construída com Node.js, Express e MongoDB. Inclui autenticação JWT, CRUD completo de eventos e interface web simples.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hashing de senhas
- **CORS** - Suporte a requisições cross-origin
- **Nodemon** - Reinício automático do servidor em desenvolvimento

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (Local ou Atlas)
- npm 

## 🔧 Instalação e Configuração

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/eventos
   JWT_SECRET=sua_chave_secreta_aqui
   ```

3. **Inicie o MongoDB:**
   Certifique-se de que o MongoDB está rodando localmente ou configure a URI para o Atlas.

4. **Execute o servidor:**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`.

## Uso da API

### Autenticação

#### Registrar usuário
```http
POST /register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Fazer login
```http
POST /login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Eventos (requer autenticação)

#### Listar eventos
```http
GET /events
Authorization: Bearer <token>
```

#### Criar evento
```http
POST /events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Reunião de equipe",
  "description": "Discussão sobre novos projetos"
}
```

#### Atualizar evento
```http
PUT /events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Reunião semanal",
  "description": "Atualização dos projetos em andamento"
}
```

#### Deletar evento
```http
DELETE /events/:id
Authorization: Bearer <token>
```

## Estrutura do Projeto

```
src/
├── app.js              # Configuração principal do Express
├── controllers/
│   ├── authController.js    # Lógica de autenticação
│   └── eventController.js   # Lógica de eventos
├── middlewares/
│   └── auth.js              # Middleware de autenticação JWT
├── models/
│   ├── Events.js            # Modelo de Evento
│   └── User.js               # Modelo de Usuário
├── routes/
│   └── routes.js             # Definição das rotas
└── views/
    ├── index.html            # Interface web
    ├── script.js             # JavaScript do front-end
    └── style.css             # Estilos CSS
server.js               # Ponto de entrada da aplicação
```

## Interface Web

A aplicação inclui uma interface web simples em `http://localhost:3000` para testar a API diretamente no navegador.

Funcionalidades:
- Cadastro e login de usuários
- Criação, listagem, edição e exclusão de eventos

## Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento (com Nodemon)


## Contato

Felipe - [GitHub](https://github.com/DoubleFelipe)

Link do projeto: [https://github.com/DoubleFelipe/-Desenvolvimento-de-API-REST-Escal-vel-com-Node.js-e-MongoDB1](https://github.com/DoubleFelipe/-Desenvolvimento-de-API-REST-Escal-vel-com-Node.js-e-MongoDB1)  