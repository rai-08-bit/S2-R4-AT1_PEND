import { Categoria } from "../models/Categorias";
import categoriaRepository from "../repositories/categoria.repository";
import { Request, Response } from "express";

const categoriaController = {
    criar: async (Req: Request, Res: Response) => {
        try {
            const { nome, descricao } = Req.body;
            if (!nome || !descricao || nome.lenght <= 3 || descricao.lenght <= 5) {
                return Res.status(400).json({ message: 'Digite corretamente os dados necessários' })
            }
            const categoria = Categoria.criar({ nome, descricao });
            const result = await categoriaRepository.create(categoria);
            return Res.status(201).json({ message: 'Categoria incluída com sucesso', result })
        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        };
    },
    atualizar: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.query.id);
            const { nome, descricao } = Req.body;
            if (!nome || !descricao || nome.lenght <= 3 || descricao.lenght <= 5 || isNaN(id) || id <= 0) {
                return Res.status(400).json({ message: 'Digite corretamente os dados necessários' })
            }
            const categoria = Categoria.editar(id, { nome, descricao });
            const result = await categoriaRepository.update(categoria);
            return Res.status(201).json({ message: 'Categoria incluída com sucesso', result })

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    listar: async (Req: Request, Res: Response) => {
        try {
            const { ativo, nome } = Req.query;
            const filtros: Record<string, any> = {};

            if (ativo) filtros.Ativo = ativo;
            if (nome) filtros.Nome = nome;

            const categorias = await categoriaRepository.read(filtros, 'AND');

            return Res.status(200).json(categorias);

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    excluir: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.params.id);
            if (isNaN(id) || id <= 0) {
                return Res.status(400).json({ message: 'Digite corretamente o ID necessário' })
            }
            const result = await categoriaRepository.delete(id);
            return Res.status(201).json({ message: 'Categoria incluída com sucesso', result })
        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    }
}

export default categoriaController;