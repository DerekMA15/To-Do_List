import { TarefaRepository } from '../repositories/TarefaRepository';
//import {TarefaService} from '../services/TarefaService'
import express, {Router, Request, Response } from 'express';

//Onde ficará a lógica de entrada e saída (HTTP).
const tarefaRepository = new TarefaRepository();
export class TarefaController { 
    // GET
    async Get(req: Request, res:Response){
        try{
            const tarefas = await tarefaRepository.buscarTodas();
            return res.json(tarefas)
        }
        catch(error){
            return res.status(500)
        }
    }

    // POST
    async Post(req: Request, res: Response){
         const { titulo } = req.body; 

    // verifiação de titulo
    if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
        // HTTP 400: Requisição Inválida (Bad Request)
        return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
    }
    
    try {
        const valores = await tarefaRepository.novaTarefa(titulo.trim());
        return res.status(201).json();
    }
    catch(error:any){
        console.log("--- ERRO NO POST ---");
        console.log("Mensagem:", error.message);
        console.log("Código:", error.code);
        console.log("--------------------");
        return res.status(500).json({ error: "Erro ao inserir nova tarefa" });
    }} 

    // DELETE =======================================
    async Delete(req: Request, res: Response){
 
    const IDParaExcluir = parseInt(req.params.id);

    if (isNaN(IDParaExcluir)) {
        return res.status(400).json({ error: "ID inválido. Use um número na URL." });
    }
    try {
        const resultado = await tarefaRepository.deletar(IDParaExcluir)
            if (resultado && resultado.rowCount === 0){
            // comparação entre o tamanho antes do delete e depois do delete - caso seja igual é porque o ID n existe.
            return res.status(404).json({ error: `Tarefa com ID ${IDParaExcluir} não encontrada.` });
        }
        return res.status(200).json({correct: `Id ${IDParaExcluir} locallizado e excluido com Sucesso.`})
    }

    // caso não encontre o id
    catch(error:any){
        console.log("--- ERRO NO DELETE ---");
        console.log("Mensagem:", error.message);
        console.log("Código:", error.code);
        console.log("--------------------");
        return res.status(500).json({ error: "Id n encontrado" });
    }
}

    
}


// DELETE 

/*
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
}) */