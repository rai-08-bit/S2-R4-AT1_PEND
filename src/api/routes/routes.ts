import { Router } from "express";
import produtoController from "../controllers/produto";
const produtoRoutes = Router();

produtoRoutes.post('/', produtoController.criar);
produtoRoutes.get('/', produtoController.listar);
produtoRoutes.put('/', produtoController.atualizar);
produtoRoutes.delete('/:id', produtoController.excluir);

export default produtoRoutes;