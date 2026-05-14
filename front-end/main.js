import criarNavbar, { ativarMenu } from "./components/layout/navbar.component";
import produtosPage from "./pages/produto.pages";
import produtosCarrinhoPage from "./pages/carrinho.pages";

criarNavbar();
produtosPage();

const btnHome = document.querySelector('#btnHome');
const btnFavoritos = document.querySelector('#btnFavoritos');

btnHome.addEventListener('click', ()=>{
    ativarMenu(btnHome);
    produtosPage();
});

btnFavoritos.addEventListener('click', ()=>{
    ativarMenu(btnFavoritos);
    produtosCarrinhoPage();
});



