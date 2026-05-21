export function salvarCarrinho(produto) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinhos') || '[]'
  );

  const jaExiste = carrinho.some(
    fav => fav.name === produto.nomeProduto
  );

  if (!jaExiste) {
    carrinho.push(produto);

    localStorage.setItem(
      'carrinhos',
      JSON.stringify(carrinho)
    );
  }
}


export function removerCarrinho(produto) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinhos') || '[]'
  );

  const carrinhoAtualizado = carrinho.filter(
    fav => fav.name !== produto.nomeProduto
  );

  localStorage.setItem(
    'carrinhos',
    JSON.stringify(carrinhoAtualizado)
  );
}


export function listarCarrinho() {
  return JSON.parse(
    localStorage.getItem('carrinhos') || '[]'
  );
}


export function noCarrinho(produto) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinhos') || '[]'
  );

  return carrinho.some(
    fav => fav.name === produto.nomeProduto
  );
}