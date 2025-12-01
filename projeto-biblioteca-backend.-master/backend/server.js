const express = require("express");
const cors = require("cors");
const initDatabase = require('./init-db');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

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
