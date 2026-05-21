import criarNavbar, { ativarMenu } from "./components/layout/navbar.component";
import produtosPage from "./pages/produto.pages";
import produtosCarrinhoPage from "./pages/carrinho.pages";

criarNavbar();
produtosPage();

const btnHome = document.querySelector('#btnHome');
const btnCarrinhos = document.querySelector('#btnCarrinhos');

btnHome.addEventListener('click', ()=>{
    ativarMenu(btnHome);
    produtosPage();
});

btnCarrinhos.addEventListener('click', ()=>{
    ativarMenu(btnCarrinhos);
    produtosCarrinhoPage();
});



