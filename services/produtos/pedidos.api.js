import axios from "axios";
const API_URL = `http://localhost:8080`;

export async function finalizarPedido(itens) {
    const body = {
        status: "Pendente",
        itens: itens.map(item => ({
            idProduto: Number(item.idProduto),
            valor: Number(item.valor),
            quantidade: Number(item.quantidade)
        }))
    };

    const resposta = await axios.post(`${API_URL}/pedidos`, body);
    return resposta.data;
}