export function criarBotaoCarrinho(carrinho = false) {
  const button = document.createElement('button');

  button.className = `
    btn p-0 border-0 rounded-circle
    d-flex align-items-center justify-content-center
    bg-light bg-opacity-75
  `;

  button.style.width = '40px';
  button.style.height = '40px';
  button.style.backdropFilter = 'blur(4px)';

  const icon = document.createElement('span');
  icon.className = 'shopping-cart';


  icon.innerText = 'carrinho';

  button.appendChild(icon);

  return button;
}