const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'livraria',
  password: '123456',
  port: 5432,
});

// Testar conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.stack);
  } else {
    console.log('Conectado ao banco PostgreSQL');
    release();
  }
});

module.exports = pool;