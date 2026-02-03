import pool from '../database'
import { ITask } from '../entities/Task';

// Onde ficará exclusivamente o acesso ao banco de dados (SQL).
export class ToDoRepository { 
    async searchALL():Promise<ITask[]> { // buscarTodas = searchALL
        const result = await pool.query('SELECT * FROM tarefas ORDER BY id ASC'); 
        return result.rows as ITask[]; 
    }

    async newToDo( titulo: string): Promise<ITask> { // não mudar no momento o nome de titulo para title porque o Postgress é bem sensivel a essas mudanças
        const querySQL = 'INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *'
        const result = await pool.query(querySQL, [titulo])
        return result.rows[0] as ITask;
        
    }

    async remove(id: number){
        const querySQL = 'DELETE FROM tarefas WHERE id = $1'
        const result = await pool.query(querySQL,[id])
        return result;// Retornamos o objeto completo do 'pg' para o controller usar o rowCount
    }

    async update(id: number, titulo: string, concluida: boolean) { // não mudar no momento o nome de titulo para title porque o Postgress é bem sensivel a essas mudanças
        const querySQL = 'UPDATE tarefas SET  titulo = $1, concluida = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(querySQL, [titulo, concluida, id]);
        return result; // Retornamos o objeto completo do 'pg' para o controller usar o rowCount
    }

}