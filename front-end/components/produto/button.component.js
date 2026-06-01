function criarBotaoCarrinho(carrinho = false){
    const button = document.createElement('button');

    button.className = `
        btn-carrinho
        btn p-0 border-0 rounded-circle
        d-flex align-items-center
        justify-content-center
        bg-dark bg-opacity-75
    `;

    button.style.width = '40px';
    button.style.height = '40px';

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined'

    icon.innerText = '🛒';

    button.appendChild(icon);

    return button;
}

export default criarBotaoCarrinho;