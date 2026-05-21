import {criarBotaoCarrinho} from './button.component.js';

import criarImagemProduto from './imagem.component.js';

import {
  salvarCarrinho,
  removerCarrinho,
  noCarrinho,
} from '../../storage/produto/carrinho.storage.js';

// Card de produto
export default function criarCardProduto(produto, onCarrinhoAlterado) {
  let carrinho = noCarrinho(produto);

  const card = document.createElement('div');
  card.className = 'card produto-card border-0';

  if (carrinho) {
    card.classList.add('carrinho');
  }

  // Imagem produto
  const imageContainer = document.createElement('div');
  imageContainer.className = 'position-relative overflow-hidden';

  const imagem = criarImagemProduto(produto);
  imagem.classList.add('card-img-top');

  // botão Carrinho
  const btnContainer = document.createElement('div');
  btnContainer.className = 'position-absolute top-0 end-0 m-2';

  const button = criarBotaoCarrinho(carrinho);

  button.addEventListener('click', () => {
    carrinho = !carrinho;

    // muda visual
    card.classList.toggle('carrinho', carrinho);

    // salva/remove
    if (carrinho) {
      salvarCarrinho(produto);
    } else {
      removerCarrinho(produto);
    }

    // callback
    if (typeof onCarrinhoAlterado === 'function') {
      onCarrinhoAlterado({
        produto,
        carrinho
      });
    }
  });

  btnContainer.appendChild(button);
  imageContainer.append(imagem, btnContainer);

  // corpo do card
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  // const categoria = document.createElement('span');
  // categoria.className = 'text-uppercase small fw-bold text-primary';
  // categoria.innerText = produto.categoria || 'EPI';

  const nome = document.createElement('h5');
  nome.className = 'card-title fw-bold mt-1 mb-2';
  nome.innerText = produto.nomeProduto;

  const preco = document.createElement('p');
  preco.className = 'text-success fw-bold';
  preco.innerText = 'R$ ' + produto.precoProduto;

  // botão ação (add/remover)
  const btnAcao = document.createElement('button');
  btnAcao.className = 'btn btn-primary w-100';
  btnAcao.innerText = produto.acao || 'Adicionar';

  btnAcao.addEventListener('click', () => {
    if (typeof onCarrinhoAlterado === 'function') {
      onCarrinhoAlterado({
        produto,
        acao: 'click'
      });
    }
  });

  cardBody.append(nome, preco, btnAcao);

  card.append(imageContainer, cardBody);

  return card;
}
