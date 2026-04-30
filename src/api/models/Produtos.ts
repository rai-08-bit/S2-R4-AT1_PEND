
export default class Produto {
    private _idProduto: number | null;
    private _nomeProduto: string;
    private _precoProduto: number;
    private _vinculoImagem: string = '';

    constructor(idProduto: number, nomeProduto: string, precoProduto: number, vinculoImagem: string) {
        this._idProduto = idProduto;
        this._nomeProduto = nomeProduto;
        this._precoProduto = precoProduto;
        this._vinculoImagem = vinculoImagem;
    }

    // --- GETTERS ---
    get idProduto(): number | null { return this._idProduto };
    get nomeProduto(): string { return this._nomeProduto };
    get precoProduto(): number { return this._precoProduto };
    get vinculoImagem(): string { return this._vinculoImagem };

    // --- SETTERS ---

    set nomeProduto(value: string) {
        this.validarNome(value);
        this._nomeProduto = value;
    }

    set idProduto(value: number) {
        this.validarId(value);
        this.idProduto = value;
    }

    set precoProduto(value: number) {
        this.validarPreco(value);
        this._precoProduto = value;
    }

    set vinculoImagem(value: string) {
        this.validarPathImagem(value);
        this._vinculoImagem = value;
    }

    // --- VALIDATIONS METHODS ---
    private validarNome(value: string) {
        if (value.trim().length < 4 || value.trim().length > 80 || !value || value === undefined || typeof value !== 'string') {
            throw new Error('O nome do produto deve ser uma frase válida, de 4 a 80 caracteres.');
        }
    }

    private validarPathImagem(value: string) {
        if (!value || value.trim().length > 255 || value.trim().length < 10) {
            throw new Error('O path da imagem é obrigatório e deve ter entre 10 e 255 caracteres');
        }
    }
    private validarPreco(value: number) {
        if (value === undefined || isNaN(value) || value <= 0) {
            throw new Error('O preco do produto deve ser um número válido e maior que 0.');
        }
    }

    private validarId(value: number) {
        if (value === undefined || isNaN(value) || value < 0) {
            throw new Error('O ID deve ser um número válido.');
        }
    }

    // --- FACTORY METHODS ---
    static criar(dados: any) {
        return new Produto(
            0, // ID inicial para novos registros
            dados.nome,
            dados.preco,
            dados.vinculoImagem,
        );
    }

    static editar(id: number, dados: any) {
        return new Produto(
            id,
            dados.nome,
            dados.preco,
            dados.vinculoImagem,
        );
    }
}