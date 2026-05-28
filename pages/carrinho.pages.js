import criarColuna from '../components/shared/column-bootstrap.component';
import { listarCarrinho } from '../storage/produto/carrinho.storage';
import criarCardProduto from '../components/produto/card.component';

export default async function produtosCarrinhoPage() {
    const app = document.querySelector('#app');

    app.innerHTML = `
    <h1 class="fw-bold text-primary">🛒 Carrinho</h1>
    <div class="row mt-4" id="lista-carrinho"></div>
    <div id="paginacao"></div>
    `;

    const row = document.querySelector('#lista-carrinho');

    const produtos = listarCarrinho();
    produtos.forEach(
        produto => {
            const coluna = criarColuna();
            const card = criarCardProduto(produto);

            const button = card.querySelector('button');

            button.addEventListener('click', () => {
                coluna.remove();
            });
            const seletorQuantidade = qtdProdutos(produto);

            card.appendChild(seletorQuantidade);

            coluna.appendChild(card);
            row.appendChild(coluna);
        });
        
    function qtdProdutos(produto, qtdI = 1) {
        const maxQtd = produto._quantidadeEstoque;
        let qtdMaxMin = Math.min(qtdI, maxQtd);

        const qtdControle = document.createElement("div");
        qtdControle.className = 'qtdControle';

        const btnDiminuir = document.createElement("button");
        btnDiminuir.className = 'btnQtd';
        btnDiminuir.innerText = '-';

        const quantidade = document.createElement("span");
        quantidade.className = 'qtdEstoque'

        const btnAumentar = document.createElement("button");
        btnAumentar.className = 'btnQtd';
        btnAumentar.innerText = '+';

        const novoValor = () => {
            quantidade.innerText = qtdMaxMin;
            btnDiminuir.disabled = qtdMaxMin === 1;
            btnAumentar.disabled = qtdMaxMin === maxQtd;
        };

        btnDiminuir.addEventListener("click", (e) => {
            e.preventDefault(); // Evita comportamentos inesperados se estiver dentro de um form
            qtdMaxMin = Math.max(1, qtdMaxMin - 1);
            novoValor();
        });

        btnAumentar.addEventListener("click", (e) => {
            e.preventDefault();
            qtdMaxMin = Math.min(maxQtd, qtdMaxMin + 1);
            novoValor();
        });

        qtdControle.getQuantidade = () => qtdMaxMin;
        qtdControle.append(btnDiminuir, quantidade, btnAumentar);
        novoValor();

        return qtdControle;
    }
};