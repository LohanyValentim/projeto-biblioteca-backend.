const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configuração da conexão com o banco PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'livraria',
  password: '123456',
  port: 5432,
});

// Cadastrar livro
router.post('/', async (req, res) => {
  const { nome, preco, descricao, estoque } = req.body;
  if (!nome || !preco || !descricao || !estoque) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO livros (nome, preco, descricao, estoque) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, preco, descricao, estoque]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar livro.', error });
  }
});

// Editar livro (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao, estoque } = req.body;
  if (!nome || !preco || !descricao || !estoque) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
  try {
    // Verifica se o livro existe
    const existente = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    if (existente.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }
    // Atualiza o livro
    const result = await pool.query(
      'UPDATE livros SET nome = $1, preco = $2, descricao = $3, estoque = $4 WHERE id = $5 RETURNING *',
      [nome, preco, descricao, estoque, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao editar livro.', error });
  }
});

// Consultar todos os livros
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM livros');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar livros.', error });
  }
});

// Consultar livro por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar livro.', error });
  }
});

// Remover livro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM livros WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao remover livro.', error });
  }
});

module.exports = router;
