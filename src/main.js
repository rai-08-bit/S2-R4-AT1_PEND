import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<section id="center">

  <h1>E-Commerce Tech</h1>

  <p>
    Carrinho usando LocalStorage
  </p>

  <button 
    id="counter" 
    class="counter"
  >
  </button>

</section>

<div class="ticks"></div>

<section id="next-steps">

  <div id="docs">

    <h2>Produtos</h2>

    <ul>

      <li>

        <a href="#">
          Notebook Gamer
        </a>

        <button class="comprar">
          Adicionar
        </button>

      </li>

      <li>

        <a href="#">
          Mouse RGB
        </a>

        <button class="comprar">
          Adicionar
        </button>

      </li>

    </ul>

  </div>

  <div id="social">

    <h2>Carrinho</h2>

    <ul id="listaCarrinho">

    </ul>

  </div>

</section>

`

setupCounter(
  document.querySelector('#counter')
)
const botoes =
  document.querySelectorAll('.comprar')
const lista =
  document.querySelector('#listaCarrinho')
let carrinho = []
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const produto =
      botao.parentElement
      .querySelector('a')
      .innerText
    carrinho.push(produto)
    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho)
    )

    mostrarCarrinho()
  })
})

function mostrarCarrinho() {

  lista.innerHTML = ''

  carrinho.forEach(item => {

    lista.innerHTML += `
      <li>${item}</li>
    `
  })
}