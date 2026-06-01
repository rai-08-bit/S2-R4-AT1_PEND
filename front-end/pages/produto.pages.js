import buscarProdutos from "../services/produtos/produtos.api";
import criarColuna from "../components/shared/column-bootstrap.component";
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
