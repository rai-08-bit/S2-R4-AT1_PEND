export default function criarImagemProduto(produto) {
    const img = document.createElement('img');

    img.alt = produto._nomeProduto || 'Imagem do produto';
    img.className = 'card-img-top img-fluid';
    img.style.height = '360px';

    if (produto._vinculoImagem) {
        img.style.objectFit = 'cover';
        img.src = `http://localhost:8080/${produto._vinculoImagem}`;

        // ✅ Se a imagem não carregar (arquivo não existe no servidor), usa o fallback
        img.onerror = () => {
            img.src = '/public/images/noImage.png';
            img.style.objectFit = 'contain';
            img.onerror = null; 
        };
    } else {
        img.style.objectFit = 'contain';
        img.src = '/public/images/noImage.png';
    }

    return img;
}