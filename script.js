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

//Atualizar a tabela com produtos filtrados
function atualizarTabela(){
    tabela.innerHTML = "";

    const fitroTexto = busca.value.toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;

    produtos.forEach((produto,index)=>{
        const nome = produto.nome.toLowerCase().includes(filtroTexto);
        const categoriaiaOK = categoriaSelecionada === "" || produto.categoria == categoriaSelecionada

        if(nomeOK && categoriaOK){
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.unidade}</td>
                <td>${produto.categoria}</td>
                <td>
                    <button class = "acao adicionar" onclick="alterarQuantidade(${index}, 1)">+</button>
                    <button class = "acao remover" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <button class = "acao editar" onclick="editarProduto(${index})">Editar</button>
                    <button class = "acao remover" onclick="removerProduto(${index})">Remover</button>
                    
                </td>
            `;
            tabela.appendChild(tr);
        }
    })
}

//Adicionar ou editar produto
form.addEventListener("submit",function(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const unidade = document.getElementById("unidade").value;
    const categoria = document.getElementById("categoria").value;

    const novoProduto = {nome, quantidade, unidade, categoria};

    if(editandoIndex === null){
        produto.push(novoProduto);
    } else {
        produto[editandoIndex] = novoProduto;
        editandoIndex = null;
    }
    salvarDados();
    atualizarTabela();
    atualizarCategoria();
    form.reset();
});
//Alterar quantidade 
function alterarQuantidade(index, valor){
    produtos[index].quantidade += valor;
    if(produtos[index].quantidade < 0){
        produtos[index].quantidade = 0;
    }
    salvarDados();
    atualizarTabela();
}
//Editar Produto
function editarProduto(){
    const produto = produtos[indexed];
    document.getElementById("nome").value = produto.nome;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("unidade").value = produto.unidade;
    document.getElementById("categoria").value = produto.categoria;
    editandoIndex = index;
}
//Remover produto
function removerProduto(){
    produtos.splice(index, 1);
    salvarDados();
    atualizarCategoria();
    atualizarTabela();
}