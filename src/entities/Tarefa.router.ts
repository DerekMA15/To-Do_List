import express, {Router, Request, Response } from 'express';
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
router.put('/:id', tarefaController.Put)

export default router; // para importar é: import router from "./..", pois definimos esse modulo como router 