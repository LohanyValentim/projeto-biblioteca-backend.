const pool = require('./config/database');

async function initDatabase() {
  try {
    // Criar tabela se não existir
    await pool.query(`
      CREATE TABLE IF NOT EXISTS livros (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        descricao TEXT,
        estoque INTEGER NOT NULL
      )
    `);

    // Verificar se já existem dados
    const result = await pool.query('SELECT COUNT(*) FROM livros');
    const count = parseInt(result.rows[0].count);

    if (count === 0) {
      // Inserir dados iniciais
      await pool.query(`
        INSERT INTO livros (nome, preco, descricao, estoque) VALUES
        ('Dom Casmurro', 25.90, 'Clássico da literatura brasileira', 10),
        ('O Cortiço', 22.50, 'Romance naturalista brasileiro', 8),
        ('1984', 35.00, 'Distopia de George Orwell', 15),
        ('O homem mais rico da Babilônia', 25.50, 'Clássico que ajuda a solucionar problemas financeiros', 3),
        ('Acuado, Escrevo!', 30.00, 'Poesia brasileira', 1),
        ('Fortaleza Digital', 40.00, 'Ficção científica da era digital', 1)
      `);
      console.log('Dados iniciais inseridos com sucesso!');
    } else {
      console.log('Banco já possui dados.');
    }
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
  }
}

module.exports = initDatabase;