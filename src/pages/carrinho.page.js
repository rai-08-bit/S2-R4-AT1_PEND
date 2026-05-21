import criarColuna from '../components/shared/coluna-bootstrap.component';
import {listarCarrinho} from '../storage/produto/carrinho.storage';
import criarCardProduto from '../components/produto/card.component';

export default async function produtosCarrinhoPage() {
    const app = document.querySelector('#app');

    app.innerHTML = `
    <h1 class="fw-bold text-primary">🛒 Carrinho</h1>
    <div class="row mt-4" id="lista-carrinho"></div>
    <div id="paginacao"></div>
    `;

    const row = document.querySelector('#lista-produtos');

    const produtos = listarCarrinho();
    produtos.forEach(
        produto =>{
            const coluna = criarColuna();
            const card = criarCardProduto(produto);

            const button = card.querySelector('button');

            button.addEventListener('click', ()=>{
                coluna.remove();
            });

            coluna.appendChild(card);
            row.appendChild(coluna);
        }
    );
}
