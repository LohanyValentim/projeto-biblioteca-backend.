# Sistema de Biblioteca Online

Sistema completo de livraria com frontend e backend integrados.

## Pré-requisitos

1. **Node.js** (versão 14 ou superior)
2. **PostgreSQL** (versão 12 ou superior)

## Instalação Rápida

### Opção 1: Instalação Automática (Windows)
```bash
# Execute o arquivo de instalação
install.bat
```

### Opção 2: Instalação Manual
```bash
# Instalar dependências
cd backend
npm install
```

## Configuração do Banco de Dados

### 1. Instalar PostgreSQL
- Baixe e instale o PostgreSQL
- Defina uma senha para o usuário `postgres`

### 2. Configurar Credenciais
Edite o arquivo `backend/config/database.js` se necessário:
```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'livraria',
  password: '123456', // Altere para sua senha
  port: 5432,
});
```

### 3. Criar Banco (Automático)
O sistema criará automaticamente:
- Banco de dados `livraria`
- Tabela `livros`
- Dados iniciais

## Executar o Sistema

### Opção 1: Script Automático (Windows)
```bash
start-server.bat
```

### Opção 2: Manual
```bash
cd backend
npm start
```

### Abrir o Frontend
1. Abra o arquivo `frontend/index.html` no navegador
2. Ou use um servidor local (Live Server, etc.)

## Funcionalidades

### Frontend
- ✅ Catálogo de livros
- ✅ Carrinho de compras
- ✅ Administração de livros
- ✅ Interface responsiva

### Backend
- ✅ API REST completa
- ✅ CRUD de livros
- ✅ Conexão com PostgreSQL
- ✅ CORS configurado
- ✅ Inicialização automática do banco

### Endpoints da API
- `GET /livros` - Listar todos os livros
- `GET /livros/:id` - Buscar livro por ID
- `POST /livros` - Cadastrar novo livro
- `PUT /livros/:id` - Atualizar livro
- `DELETE /livros/:id` - Excluir livro

## Estrutura do Projeto
```
projeto-biblioteca-backend.master/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── livros.js
│   ├── server.js
│   ├── init-db.js
│   └── package.json
├── frontend/
│   ├── assets/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── install.bat
├── start-server.bat
└── README.md
```

## Solução de Problemas

### Erro de Conexão com Banco
1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais em `config/database.js`
3. Certifique-se que o banco `livraria` existe

### Erro de CORS
- O CORS já está configurado para aceitar todas as origens
- Certifique-se que o backend está rodando na porta 3000

### Frontend não carrega dados
1. Verifique se o backend está rodando
2. Abra o console do navegador para ver erros
3. Confirme que a URL da API está correta: `http://localhost:3000`

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **Outras**: CORS, pg (driver PostgreSQL)