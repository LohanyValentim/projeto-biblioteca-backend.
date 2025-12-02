const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importa as rotas de livros (supondo que elas estão na pasta routes/livros.js)
const livrosRoutes = require("./routes/livros");

app.use("/livros", livrosRoutes);

// Rota principal para teste
app.get("/", (req, res) => {
  res.json({ mensagem: "Backend da Biblioteca Online funcionando!" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});




