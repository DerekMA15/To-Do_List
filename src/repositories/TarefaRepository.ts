import pool from '../database'

// Onde ficará exclusivamente o acesso ao banco de dados (SQL).
export class TarefaRepository { 
    async getTodas() {
        const result = await pool.query('SELECT * FROM tarefas ORDER BY id ASC'); 
        return result.rows; 
    }
}