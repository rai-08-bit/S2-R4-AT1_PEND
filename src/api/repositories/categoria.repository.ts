import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Categoria } from '../models/Categorias';
import { connection } from '../configs/Database';
import buildWhere from './helpers/buildWhere.repository';


const categoriaRepository = {
    create: async (categoria: Categoria): Promise<ResultSetHeader> => {
        const sql = 'INSERT INTO categorias (NomeCategoria, DescricaoCategoria) VALUES (?,?)';
        const values = [categoria.nomeCategoria, categoria.descricao];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    },
    /**
         * Busca categorias no banco de dados.
         * 
         * @param where Objeto contendo os filtros da query
         * Exemplo:
         * {
         *   IdCategoria: 1,
         *   Ativo: 1
         * }
         * 
         * @param operator Operador lógico entre os filtros
         *
         * Pode ser:
         * - 'AND'
         * - 'OR'
         * 
         * @returns Lista de categorias encontradas
         */

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
        FROM categorias
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
    update: async (categoria: Categoria): Promise<ResultSetHeader> => {
        const sql = 'UPDATE categorias SET NomeCategoria=?, DescricaoCategoria=? WHERE IdCategoria=?';
        const values = [categoria.nomeCategoria, categoria.descricao, categoria.idCategoria];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    },
    delete: async (id: number): Promise<boolean> => {
        const sql = 'DELETE FROM categoria WHERE idCategoria = ?';
        const [result] = await connection.execute<ResultSetHeader>(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default categoriaRepository;