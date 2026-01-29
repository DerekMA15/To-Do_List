import {TarefaService} from '../services/TarefaService'
import express, {Router, Request, Response } from 'express';

//Onde ficará a lógica de entrada e saída (HTTP).
export class TarefaController { 
    async listar(req: Request, res:Response){
        try{
            const tarefaService = new TarefaService();
            const tarefas = await tarefaService.buscarTodos();
            return res.json(tarefas)
        }
        catch(error){
            return res.status(500)
        }
    }
}