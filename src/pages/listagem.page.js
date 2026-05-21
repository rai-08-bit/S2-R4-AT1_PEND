// import buscarProdutos from "../services/produtos/produtos.api";
import criarColuna from "../components/shared/coluna-bootstrap.component";
import criarCardProduto from "../components/produto/card.component";

export default async function produtosPage() {
    const app = document.querySelector('#app');

    app.innerHTML = `
        <h1 class="fw-bold text-primary"> 📦 Produtos </h1>
        <div class="row mt-4" id="lista-produtos"></div>
    `;

    const row = document.querySelector('#lista-produtos');

    const produtos = await buscarProdutos();

    produtos.forEach(produto => {
        const coluna = criarColuna();

        const card = criarCardProduto(produto);

        coluna.appendChild(card);
        row.appendChild(coluna);
    });
}