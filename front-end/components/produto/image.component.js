export default function criarImagemProduto(produto){
    const img = document.createElement('img');
    img.alt = personagem.name;
    img.className = 'card-img-top img-fluid';

    img.style.height = '360px';
    img.style.objectFit = produto.image ? 'cover' : '';


    img.src = produto.image ? produto.image : '../../../public/images/nolmage.png';

    return img;
}
