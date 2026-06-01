export const produtosStorage = {
    salvar(produtos) {
        localStorage.setItem("produtos", JSON.stringify(produtos));
    },

    obter() {
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }
};