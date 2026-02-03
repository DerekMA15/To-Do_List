import { ToDoRepository } from '../repositories/ToDoRepository';
//import {TarefaService} from '../services/TarefaService'
import express, {Router, Request, Response } from 'express';

//Onde ficará a lógica de entrada e saída (HTTP).
const toDoRepository = new ToDoRepository();
export class ToDoController { 
    
    // GET
    async routeGet(req: Request, res:Response){
        try{
            const allToDo = await toDoRepository.searchALL();
            return res.json(allToDo)
        }
        catch(error){
            return res.status(500)
        }
    }

    // POST
    async routePost(req: Request, res: Response){
         const { titulo } = req.body; // não alterar o nome titulo porque 

    // verifiação de titulo
    if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
        // HTTP 400: Requisição Inválida (Bad Request)
        return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
        
    }
    
    try {
        const valors = await toDoRepository.newToDo(titulo.trim());
        return res.status(201).json();
    }
    catch(error:any){
        console.log("--- ERRO NO POST ---");
        console.log("Mensagem:", error.message);
        console.log("Código:", error.code);
        console.log("--------------------");
        return res.status(500).json({ error: "Erro ao inserir nova tarefa" });
    }} 

    //fazer verificador de ID mais geral

    // DELETE 
    async routeDelete(req: Request, res: Response){
 
    const idtoRemove = parseInt(req.params.id);

    if (isNaN(idtoRemove)) {
        return res.status(400).json({ error: "ID inválido. Use um número na URL." });
    }
    try {
        const result = await toDoRepository.remove(idtoRemove)
            if (result && result.rowCount === 0){
            // comparação entre o tamanho antes do delete e depois do delete - caso seja igual é porque o ID n existe.
            return res.status(404).json({ error: `Tarefa com ID ${idtoRemove} não encontrada.` });
        }
        return res.status(200).json({correct: `Id ${idtoRemove} locallizado e excluido com Sucesso.`})
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
// PUT ===
    async routePut(req: Request, res: Response){
    // entradas
    const idtoUpdate:number = parseInt(req.params.id);
    const  {titulo, concluida} = req.body;
    // vallidação das entradas
     
    if (isNaN(idtoUpdate)) {
        return res.status(400).json({ error: "ID inválido. Use um número na URL." });
    }
    if (!titulo || titulo.trim().length === 0) {
            return res.status(400).json({ error: "O novo título deve ser preenchido." });
    }
    try {
        const resultado = await toDoRepository.update(idtoUpdate,titulo,concluida)
        if(resultado && resultado.rowCount === 0){
            return res.status(404).json({ error: `Tarefa com ID ${idtoUpdate} não encontrada.` });
        }
        return res.status(200).json({correct: `Id ${idtoUpdate} locallizado e modificado com sucesso.`})
    }
    catch(error:any){
        console.log("--- ERRO NO PUT ---");
        console.log("Mensagem:", error.message);
        console.log("Código:", error.code);
        console.log("--------------------");
     }
}

}