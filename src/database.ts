import dotenv from 'dotenv';
import path from 'node:path';
import { Pool } from 'pg';

// Justificativa do Pool: Criamos uma "piscina" de conexões. 
// Em vez de abrir uma conexão nova toda vez (o que é lento), 
// o código pega uma que já existe na piscina, usa e devolve.

// garantia para que o dotenv encontre o arq. na raiz 
dotenv.config({path: path.resolve(__dirname,'../env')});

const pool = new Pool({
  user: process.env.DB_USER,          // O usuário "dono" do banco no Linux
  host: process.env.DB_HOST,         // Onde o banco está (na sua própria máquina)
  database: process.env.DB_DATABASE,  // O "livro" que você criou no psql
  password: String(process.env.DB_PASSWORD),     // A senha que você definiu (se houver)
  port: Number(process.env.DB_PORT) || 5432,                // A porta padrão onde o Postgres "escuta"
});

pool.query('SELECT NOW()', (err, res) => {
    // o SELECT NOW() pede às horas ao BD e caso ele responda ja nos garante que ele está ativo, caso não responda ja sabemos que ele tá desativado.
  if (err) {
    console.error('❌ Erro crítico: Não foi possível conectar ao banco de dados!', err.message);
  } else {
    console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso!');
  }
});

export default pool;