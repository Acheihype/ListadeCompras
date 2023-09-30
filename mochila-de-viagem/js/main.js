const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach(element => {
  criaElemnto(element)
});

form.addEventListener("submit", (event) => {
  event.preventDefault()

if (event.submitter.className !== "limpar"){
  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  const existe = itens.find(element => element.nome === nome.value)

  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }

  if(existe){
    itemAtual.id = existe.id

    atualizaElemento(itemAtual);

    itens[itens.findIndex(element => {console.log(element);
      element.id === itemAtual.id})] = itemAtual

  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1].id) + 1 : 0

    criaElemnto(itemAtual)

    itens.push(itemAtual)

  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = ""
  quantidade.value = ""

} else {
  itens.splice(itens.forEach(x => x.remove))
  document.querySelector('.lista').innerHTML = ''
  console.log("to vivo")
  return "aa"
}
})

function criaElemnto(itemAtual) {

  if(itemAtual.nome == "" || itemAtual.quantidade == ""){
    ""
  } else {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
  
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = itemAtual.quantidade
    numeroItem.dataset.id = itemAtual.id
    
    novoItem.appendChild(numeroItem)
  
  
    novoItem.innerHTML += itemAtual.nome
  
    novoItem.appendChild(botaoDeleta(itemAtual.id))
    lista.appendChild(novoItem)
  }

}

function atualizaElemento(itemAtual){
  document.querySelector("[data-id='"+itemAtual.id+"']").innerHTML = itemAtual.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "X"
  elementoBotao.classList.add("botaoDeleta")

  elementoBotao.addEventListener("click", function(){
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id){
  tag.remove()

  itens.splice(itens.findIndex(element => element.id === id), 1)

  localStorage.setItem("itens", JSON.stringify(itens));
}