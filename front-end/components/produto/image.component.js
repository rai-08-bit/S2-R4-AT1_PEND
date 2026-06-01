export default function criarImagemProduto(produto) {
    const img = document.createElement('img');
    
    // 1. Garante um fallback para o alt text caso o nome venha vazio
    img.alt = produto.nomeProduto || 'Imagem do produto';
    img.className = 'card-img-top img-fluid';

    // 2. Estilização fixa 
    img.style.height = '360px';
    img.style.objectFit = produto._vinculoImagem ? 'cover' : 'contain'; 

    img.src = produto._vinculoImagem 
        ? `http://localhost:8080/produtos/${produto._vinculoImagem}` 
        : '../public/images/noImage.png';

    return img;
}