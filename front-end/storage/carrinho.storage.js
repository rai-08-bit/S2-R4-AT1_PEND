export function salvarFavorito(produto) {
    const carrinho = JSON.parse(
        localStorage.getItem('carrinho') || '[]'
    );

    const jaExiste = produtosCarrinhos.some(
        car => car.name === produto.name
    );

    if (!jaExiste) {
        carrinho.push(produto);

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
}

export function removerFavorito(produto) {
    const carrinho = JSON.parse(
        localStorage.getItem('produtos') || '[]'
    );

    const carrinhoAtualizados = carrinho.filter(
        fav => fav.name !== produto.name
    );

    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizados));
}

export function estaCarrinho(produto) {
    const carrinho = JSON.parse(
        localStorage.getItem('carrinho') || '[]'
    );

    carrinho.some(
        car => car.name === produto.name
    );
}

export function listarCarrinho() {
    return JSON.parse(
        localStorage.getItem('carrinho') || '[]'
    );
}