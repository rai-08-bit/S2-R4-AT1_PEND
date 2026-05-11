export default function criarImagemProduto(produto) {
  const img = document.createElement('img');
  img.alt = produto.nomeProduto;
  img.className = '';

  img.style.height = '360px';
  img.style.objectFit = produto.vinculoImagemProduto ? 'cover' : '';

  img.src = produto.vinculoImagemProduto ? produto.vinculoImagemProduto : '../../../public/noImage.png';
}