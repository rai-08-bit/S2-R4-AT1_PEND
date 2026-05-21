export default function criarImagemProduto(produto) {
    const img = document.createElement('img');
    img.alt = produto.nomeProduto;
    img.className = 'card-img-top img-fluid';

    img.style.height = '360px';
    img.style.objectFit = produto._vinculoImagem ? 'cover' : '';


    img.src = `http://localhost:8080/${produto._vinculoImagem}`;

    console.log(img.src);

    return img;
}
