//Função que busca dados do localstorage ou inicia uma lista vazia
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let editandoIndex = null;

//Elementos do DOM
const form = document.getElementById("form-produto");
const tabela = document.getElementById("tabela-produtos");
const busca = document.getElementById("busca");
const filtroCategoria = document.getElementById("filtro-categoria");

function salvarDados(){
    localStorage.setItem("produtos", JSON.stringify(produtos));
}
function atualizarCategoria(){
    filtroCategoria.innerHTML='<option value="">Todas as Categorias</option>';
    const CategoriasUnicas = [... new Set(produtos.map(p=> p.categoria))];
    CategoriasUnicas.forEach(cat =>{
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        filtroCategoria.appendChild(option);
    });
}
