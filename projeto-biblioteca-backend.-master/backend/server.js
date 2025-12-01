const express = require("express");
const cors = require("cors");
const initDatabase = require('./init-db');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Headers CORS adicionais
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Rota teste
app.get("/", (req, res) => {
  res.json({ mensagem: "Backend da Biblioteca Online funcionando!" });
});

// Rotas da API
const livrosRoutes = require("./routes/livros");
app.use("/livros", livrosRoutes);

// Inicializar servidor
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
