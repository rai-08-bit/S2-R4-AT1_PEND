export function listarCarrinho() {
    return JSON.parse(
        localStorage.getItem('carrinho') || '[]'
    );
}

function atualizarLocalStorage(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

export function salvarProduto(produto) {
    const carrinho = listarCarrinho();

    if (!estaNoCarrinho(produto)) {
        carrinho.push(produto);
        atualizarLocalStorage(carrinho);
    }
}

export function removerProduto(produto) {
    const carrinho = listarCarrinho();

    const carrinhoAtualizado = carrinho.filter(
        car => car._idProduto !== produto._idProduto
    );

    atualizarLocalStorage(carrinhoAtualizado);
}

export function estaNoCarrinho(produto) {
    const carrinho = listarCarrinho();
    
    return carrinho.some(
        car => car._idProduto === produto._idProduto
    );
}