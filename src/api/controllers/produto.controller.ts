import { Request, Response } from "express";
import produtoRepository from "../repositories/produto.repository";
import Produto from "../models/Produtos";

const produtoController = {
    criar: async (Req: Request, Res: Response) => {
        try {
            const idCategoria: Number = Req.body.idCategoria;
            const quantidade: Number = Req.body.quantidade;
            const preco: Number = Req.body.preco;
            const descricao: String = Req.body.descricao;
            const nome: String = Req.body.nome;

            if (!Req.file) {
                return Res.status(400).json({
                    message: 'Arquivo de imagem não enviado.'
                });
            }

            const caminhoImagem: string = `src/uploads/images/${Req.file.filename}`;

            const produto = Produto.criar({
                idCategoria: Number(idCategoria),
                nome: String(nome),
                descricaoProduto: String(descricao),
                preco: Number(preco),
                quantidadeEstoque: Number(quantidade),
                vinculoImagem: caminhoImagem,
            });

            const result = await produtoRepository.create(produto);

            return Res.status(201).json({
                message: 'Registro inserido com sucesso.',
                produto: result,
                file: {
                    filename: Req.file.filename,
                    size: Req.file.size,
                    mimetype: Req.file.mimetype,
                }
            });

        } catch (error: any) {
            return Res.status(400).json({ message: error.message });
        }
    },
    atualizar: async (Req: Request, Res: Response) => {
        try {

            const id  = Number(Req.params.id);
            const { idCategoria, nomeProduto, descricaoProduto, precoProduto, quantidadeEstoque, vinculoImagem } = Req.body;

            if (!id) {
                Res.status(400).json({ error: 'O ID do produto é obrigatório na URL.' });
                return;
            };
            
            const produtoAtualizado = Produto.editar(Number(id), {
                idCategoria: Number(idCategoria),
                nome: nomeProduto,
                descricaoProduto,
                preco: Number(precoProduto),
                quantidadeEstoque: Number(quantidadeEstoque),
                vinculoImagem
            });

            const result = await produtoRepository.update(produtoAtualizado);

            if (result.affectedRows === 0) {
                Res.status(404).json({ error: 'Produto não encontrado.' });
                return;
            }

            Res.status(200).json({
                message: 'O produto foi atualizado com sucesso.', affectedRows: result.affectedRows});

        } catch (error: any) {
            return Res.status(400).json({ message: error.message });
        }
    },
    listar: async (Req: Request, Res: Response) => {
        try {
            const filtro = Req.query;

            const operator = (Req.query.operator as 'AND' | 'OR') || 'AND';

            const whereClause = { ...filtro };
            delete whereClause.operator;

            const produtos = await produtoRepository.read(
                Object.keys(whereClause).length ? whereClause : undefined,
                operator
            );

            Res.status(200).json(produtos);
        } catch (error: any) {
            return Res.status(400).json({ message: error.message });
        }
    },
    excluir: async (Req: Request, Res: Response) => {
        try {

            const id: number = Number(Req.params.id);
            const result = await produtoRepository.delete(id);

            return Res.status(200).json({ message: 'O produto foi excluído com sucesso!', data: result });

        } catch (error: any) {
            return Res.status(400).json({ message: error.message });
        }
    }
}

export default produtoController;