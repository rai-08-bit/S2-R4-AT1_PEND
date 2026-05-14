import axios from "axios";
const PORT = process.env.PORT;
const API_URL = `https://localhost:${PORT}`;

export default async function buscarProdutos() {
    try {
        const resposta = await axios.get(API_URL);
        return resposta.data;

    } catch (error) {
        console.error('Erro ao buscar personagens', error);
        return [];
    }
}