import express, {Router, Request, Response } from 'express';
import { TarefaRepository } from '../repositories/TarefaRepository';
/*Onde ficariam as regras de negócio mais complexas. Para este projeto, podemos começar 
integrando a lógica no Controller e Repository para não criar arquivos demais de uma vez. */

export class TarefaService{ 
    // async buscarTodas(){
    //     const tarefaRepository = new TarefaRepository(); 
    //     return await tarefaRepository.buscarTodas();
    // }

    // async novaTarefa(titulo:string){
    //     const tarefaRepository = new TarefaRepository();
    //     return await tarefaRepository.novaTarefa(titulo);

    // }

    // async atualizar() { 
    //     const tarefaRepository = new TarefaRepository();
    //     //return await tarefaRepository.atualizar();
    // }
}