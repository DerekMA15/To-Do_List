import pool from '../database'

// Onde ficará exclusivamente o acesso ao banco de dados (SQL).
export class TarefaRepository { 
    async buscarTodas() {
        const result = await pool.query('SELECT * FROM tarefas ORDER BY id ASC'); 
        return result.rows; 
    }

    async novaTarefa( titulo: string){
        const querySQL = 'INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *'
        const result = await pool.query(querySQL, [titulo])
        return result.rows[0];
    }

    async deletar(id: number){
        const querySQL = 'DELETE FROM tarefas WHERE id = $1'
        const result = await pool.query(querySQL,[id])
        return result;// Retornamos o objeto completo do 'pg' para o controller usar o rowCount
    }

    async atualizar(id: number, titulo: string, concluida: boolean) {
        const querySQL = 'UPDATE tarefas SET  titulo = $1, concluida = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(querySQL, [titulo, concluida, id]);
        return result; // Retornamos o objeto completo do 'pg' para o controller usar o rowCount
    }

}

