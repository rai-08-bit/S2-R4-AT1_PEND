import axios from "axios";
const API_URL = `http://localhost:8080/produtos`;

export default async function buscarProdutos() {
    try {
        const resposta = await axios.get(API_URL);
        return resposta.data;

    } catch (error) {
        console.error('Erro ao buscar produtos', error);
        return [];
    }
}