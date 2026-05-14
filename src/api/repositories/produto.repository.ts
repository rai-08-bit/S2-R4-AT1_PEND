import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../configs/Database';
import buildWhere from './helpers/buildWhere.repository';
import Produto from '../models/Produtos';

const produtoRepository = {
    create: async (produto: Produto): Promise<ResultSetHeader> => {
        const sql = 'INSERT INTO produtos (IdCategoria, NomeProduto, DescricaoProduto, PrecoProduto, QuantidadeEstoque, VinculoImagem) VALUES (?,?,?,?,?)';
        const values = [produto.idCategoria ,produto.nomeProduto, produto.descricaoProduto, produto.precoProduto, produto.quantidadeEstoque, produto.vinculoImagem];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    },
    read: async (
        where?: Record<string, any>,
        operator: 'AND' | 'OR' = 'AND'
    ): Promise<RowDataPacket[]> => {

        /**
         * Query base.
         * 
         * O "WHERE 1=1" facilita a concatenação
         * dinâmica de condições posteriormente.
         */
        let sql = `
        SELECT *
        FROM produtos
        WHERE 1=1
    `;

        /**
         * Monta dinamicamente:
         * - cláusula WHERE
         * - valores da query
         * 
         * Exemplo:
         * {
         *   clause: " AND (IdCategoria = ? AND Ativo = ?)",
         *   values: [1, 1]
         * }
         */
        const builtWhere = buildWhere(
            where,
            operator
        );

        /**
         * Adiciona cláusulas dinâmicas na query.
         */
        sql += builtWhere.clause;

        /**
         * Executa query parametrizada.
         * 
         * O uso de "?" evita SQL Injection.
         */
        const [rows] = await connection.execute<RowDataPacket[]>(
            sql,
            builtWhere.values
        );

        /**
         * Retorna os registros encontrados.
         */
        return rows;
    },
    update: async (produto: Produto): Promise<ResultSetHeader> => {
        const sql = `UPDATE categorias SET NomeCategoria=?, DescricaoCategoria=? WHERE IdCategoria=?`;
        const values = [produto.idCategoria, produto.nomeProduto, produto.descricaoProduto, produto.precoProduto, produto.quantidadeEstoque, produto.vinculoImagem, produto.idProduto];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    },
    delete: async (id: number): Promise<boolean> => {
        const sql = 'DELETE FROM produtos WHERE IdProduto = ?';
        const [result] = await connection.execute<ResultSetHeader>(sql, [id]);
        return result.affectedRows > 0;
    }
}
export default produtoRepository