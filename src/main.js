import criarNavbar, { ativarMenu } from './components/layout/navbar.component';
import { produtosCarrinhoPage } from './pages/carrinho.page.js';
criarNavbar();
produtosCarrinhoPage();

const btnHome = document.querySelector('#btnHome');
const btnCarrinho = document.querySelector('#btnCarrinho');

// Controla a navegação entre páginas da aplicação
btnHome.addEventListener('click', () => {
  ativarMenu(btnHome);
  produtosCarrinhoPage();
});

btnCarrinho.addEventListener('click', () => {
  ativarMenu(btnCarrinho);
  personagensFavoritosPage();
});