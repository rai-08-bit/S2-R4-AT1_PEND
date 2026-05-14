import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../configs/Database';
import { ItensPedido } from '../models/Itens_Pedido';

export const itensPedidoRepository = {
    // 1. CRIAR ITENS E ATUALIZAR TOTAL
    criarItem: async (idPedido: number, itensPedido: ItensPedido[]) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlInsertItem = `
                INSERT INTO Itens_Pedido (FK_IdPedido, FK_IdProduto, Quantidade, Valor) 
                VALUES (?, ?, ?, ?);
            `;

            for (const item of itensPedido) {
                const values = [
                    idPedido,
                    item.produtoId, 
                    item.quantidade,
                    item.valor,
                ];
                await conn.execute(sqlInsertItem, values);
            }

            const sqlSoma = `
                SELECT SUM(Quantidade * Valor) as novoTotal 
                FROM Itens_Pedido 
                WHERE FK_IdPedido = ?;
            `;

            const [rowsSoma]: any = await conn.execute(sqlSoma, [idPedido]);
            const novoTotal = rowsSoma[0].novoTotal || 0;

            const sqlUpdatePedido = "UPDATE Pedidos SET ValorTotal = ? WHERE IdPedido = ?;";
            await conn.execute(sqlUpdatePedido, [novoTotal, idPedido]);

            await conn.commit();

            return { idPedido, valorTotal: novoTotal };
        } catch (error) {
            await conn.rollback();
            console.error("Erro ao adicionar itens:", error);
            throw error;
        } finally {
            conn.release();
        }
    },

    // 2. LER ITENS DE UM PEDIDO
    read: async (idPedido: number): Promise<ItensPedido[]> => {
        const sql = 'SELECT * FROM Itens_Pedido WHERE FK_IdPedido = ?';
        const [rows] = await connection.execute<RowDataPacket[]>(sql, [idPedido]);

        return rows.map(row => new ItensPedido(
            row.IdItem_Pedido, 
            row.FK_IdPedido,    
            row.FK_IdProduto, 
            row.Valor,
            row.Quantidade
        ));
    },

    // 3. ATUALIZAR ITEM (E RECALCULAR TOTAL)
    update: async (item: ItensPedido): Promise<boolean> => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlUpdateItem = `
                UPDATE Itens_Pedido 
                SET Quantidade = ?, Valor = ?
                WHERE IdItem_Pedido = ?
            `;
            const [result] = await conn.execute<ResultSetHeader>(sqlUpdateItem, [
                item.quantidade,
                item.valor,
                item.id
            ]);

            const sqlGetPedido = "SELECT FK_IdPedido FROM Itens_Pedido WHERE IdItem_Pedido = ?";
            const [row]: any = await conn.execute(sqlGetPedido, [item.id]);
            
            if (row.length > 0) {
                const idPedido = row[0].FK_IdPedido;
                const sqlSoma = "SELECT SUM(Quantidade * Valor) as total FROM Itens_Pedido WHERE FK_IdPedido = ?";
                const [soma]: any = await conn.execute(sqlSoma, [idPedido]);
                
                await conn.execute("UPDATE Pedidos SET ValorTotal = ? WHERE IdPedido = ?", [soma[0].total || 0, idPedido]);
            }

            await conn.commit();
            return result.affectedRows > 0;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    // 4. DELETAR ITEM (E ATUALIZAR TOTAL)
    delete: async (idItem: number): Promise<boolean> => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            // 1. Descobrir qual era o pedido antes de deletar
            const sqlSelect = 'SELECT FK_IdPedido FROM Itens_Pedido WHERE IdItem_Pedido = ?';
            const [rows]: any = await conn.execute(sqlSelect, [idItem]);

            if (rows.length === 0) {
                await conn.rollback();
                return false;
            }

            const idPedidoOriginal = rows[0].FK_IdPedido;

            // 2. Deletar o item
            const sqlDelete = 'DELETE FROM Itens_Pedido WHERE IdItem_Pedido = ?';
            const [result] = await conn.execute<ResultSetHeader>(sqlDelete, [idItem]);

            // 3. Recalcular e atualizar o ValorTotal no Pedido
            const sqlSoma = 'SELECT SUM(Quantidade * Valor) as novoTotal FROM Itens_Pedido WHERE FK_IdPedido = ?';
            const [somaRows]: any = await conn.execute(sqlSoma, [idPedidoOriginal]);
            const novoTotal = somaRows[0].novoTotal || 0;

            await conn.execute('UPDATE Pedidos SET ValorTotal = ? WHERE IdPedido = ?', [novoTotal, idPedidoOriginal]);

            await conn.commit();
            return result.affectedRows > 0;

        } catch (error: any) {
            await conn.rollback();
            console.error("Erro ao deletar item:", error);
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default itensPedidoRepository;