import express, {Router, Request, Response } from 'express';
import pool from '../database'; // agora iremos usar a nossa pool- o nosso banco de dados
import { ToDoController } from '../controllers/ToDoController';
// nota: ainda n entendi muito bem sobre     a pool, mas estou seguindo uma sequência de passsos e conforme for entendendo faço as melhorias qwue achar melhor.


const router = Router(); 
const toDoController = new ToDoController(); 

// GET ===
router.get ('/', toDoController.routeGet);

// POST ===
router.post('/', toDoController.routePost);

// DELETE ===
router.delete('/:id', toDoController.routeDelete);

// PUT ===
router.put('/:id', toDoController.routePut)

export default router; // para importar é: import router from "./..", pois definimos esse modulo como router 