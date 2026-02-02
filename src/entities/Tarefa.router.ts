import express, {Router, Request, Response } from 'express';
import { Tarefa } from './Tarefa';
import pool from '../database'; // agora iremos usar a nossa pool- o nosso banco de dados
import { TarefaController } from '../controllers/TarefaController';
// nota: ainda n entendi muito bem sobre     a pool, mas estou seguindo uma sequência de passsos e conforme for entendendo faço as melhorias qwue achar melhor.


const router = Router(); 
const tarefaController = new TarefaController(); 

// GET ===
router.get ('/', tarefaController.Get);

// POST ===
router.post('/', tarefaController.Post);

// DELETE =======================================
router.delete('/:id', tarefaController.Delete);

// PUT =======================================
router.put('/:id',  async (req: Request, res: Response) => {
    const IDParaEditar:number = parseInt(req.params.id);
    // mantém. 
    const  {titulo, concluida} = req.body;

    console.log(`Tentando editar a tarefa ${IDParaEditar} para o novo título: ${titulo}`);
    console.log("ID que chegou na URL:", req.params.id);

    // vallidação do ID de entrada 
     
    if (isNaN(IDParaEditar)) {
        return res.status(400).json({ error: "ID inválido. Use um número na URL." });
    }
    // Validação título
    if (!titulo || titulo.trim().length === 0) {
            return res.status(400).json({ error: "O novo título deve ser preenchido." });
    }
    // pega o tamanho do array para garantir que o id está entre eles, caso o id pedido para edição seja maior que os valores da coluna.
    try {
        //update
        const updateByID = 'UPDATE tarefas SET titulo = $1, concluida = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(updateByID,[titulo,concluida, IDParaEditar]);    
        if(result.rowCount === 0){
            return res.status(404).json({ error: `Tarefa com ID ${IDParaEditar} não encontrada.` });
        }
        
        return res.status(200).json({correct: `Id ${IDParaEditar} locallizado e modificado com sucesso.`})
    }
    catch(error:any){
        
        console.log("--- ERRO NO POST ---");
        console.log("Mensagem:", error.message);
        console.log("Código:", error.code);
        console.log("--------------------");

     }
})

export default router; // para importar é: import router from "./..", pois definimos esse modulo como router 