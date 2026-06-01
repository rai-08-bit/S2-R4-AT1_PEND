import criarColuna from '../components/shared/column-bootstrap.component';
import { listarCarrinho, removerProduto } from '../storage/produto/carrinho.storage';
import criarCardProduto from '../components/produto/card.component';
import { finalizarPedido } from '../services/produtos/pedidos.api';

export default async function produtosCarrinhoPage() {
    const app = document.querySelector('#app');

    app.innerHTML = `
    <h1 class="fw-bold text-primary">🛒 Carrinho</h1>
    <div class="row mt-4" id="lista-carrinho"></div>
    <div id="paginacao"></div>
    <div class="mt-4">
        <button id="btn-finalizar" class="btn btn-success btn-lg">
            ✅ Finalizar Pedido
        </button>
    </div>
    `;

    const row = document.querySelector('#lista-carrinho');

    // Map para acessar o qtdControle de cada produto pelo idProduto
    const qtdControleMap = new Map();

    const produtos = listarCarrinho();

    produtos.forEach(produto => {
        const coluna = criarColuna();
        const card = criarCardProduto(produto);

        const button = card.querySelector('button');
        button.addEventListener('click', () => {
            removerProduto(produto);
            coluna.remove();
        });

        const seletorQuantidade = qtdProdutos(produto);

        // Guarda referência ao controle de quantidade pelo id do produto
        qtdControleMap.set(produto._idProduto, {
            seletor: seletorQuantidade,
            produto: produto
        });

        card.appendChild(seletorQuantidade);
        coluna.appendChild(card);
        row.appendChild(coluna);
    });

    // Botão finalizar pedido
    document.querySelector('#btn-finalizar').addEventListener('click', async (event) => {
        if (qtdControleMap.size === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        const botao = event.currentTarget;

        const itens = Array.from(qtdControleMap.values()).map(({ seletor, produto }) => ({
            idProduto: produto._idProduto,
            valor: produto._precoProduto,
            quantidade: seletor.getQuantidade()
        }));

        try {
            botao.disabled = true;
            botao.textContent = 'Processando...';
        
            const { pedidoId, total } = await finalizarPedido(itens);
        
            alert(`Pedido #${pedidoId} criado! Total: R$ ${total}`);

            listarCarrinho().forEach(produto => removerProduto(produto));
            produtosCarrinhoPage();

        } catch (error) {
            console.error('Erro ao finalizar pedido:', error);
            alert('Não foi possível finalizar o seu pedido. Tente novamente em instantes.');
        } finally {
            botao.disabled = false;
            botao.textContent = 'Finalizar Pedido';
        }
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
