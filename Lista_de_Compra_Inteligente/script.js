// Pegando os elementos do Html
const inputItem = document.querySelector(".add input[type='text']");
const BotaoAdd = document.querySelector(".add input[type='submit']");
const inputPesquisa = document.querySelector(".pesquisa input[type='text']");
const list = document.querySelector(".lista");

// Para carregar os itens do LocalStorage
function carregarItens() {
  const itensSalvos = JSON.parse(localStorage.getItem("itensLista")) || [];
  list.innerHTML = ""; // Limpar a lista
  itensSalvos.forEach(addItemNaLista);
}

// Função para adicionar um item à lista e ao LocalStroge
function adicionarItem() {
  const itemTexto = inputItem.value.trim();
  if (itemTexto === "") return;

  addItemNaLista(itemTexto);

  const itensSalvos = JSON.parse(localStorage.getItem("itensLista")) || [];
  itensSalvos.push(itemTexto);
  localStorage.setItem("itensLista", JSON.stringify(itensSalvos));

  inputItem.value = "";
}

function addItemNaLista(itemTexto) {
  // Criado cada espaço para o item
  const novoItem = document.createElement("div");
  novoItem.textContent = itemTexto;
  novoItem.style.padding = "10px";
  novoItem.style.borderBottom = "1px solid #fff";
  novoItem.style.display = "flex";
  novoItem.style.justifyContent = "space-between";
  novoItem.style.alignItems = "center";

  // Criando o botão de remover
  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";
  botaoRemover.style.backgroundColor = "red";
  botaoRemover.style.color = "white";
  botaoRemover.style.border = "none";
  botaoRemover.style.borderRadius = "2px";
  botaoRemover.style.cursor = "pointer";

  botaoRemover.onclick = function () {
    list.removeChild(novoItem);
    removeDoLocalStrorage(itemTexto);
  };

  novoItem.appendChild(botaoRemover);
  list.append(novoItem);
}

// Remover um item do localStorage
function removeDoLocalStrorage(itemTexto) {
  let itensSalvos = JSON.parse(localStorage.getItem("itensLista")) || [];
  itensSalvos = itensSalvos.filter((item) => item !== itemTexto);
  localStorage.setItem("itensLista", JSON.stringify(itensSalvos));
}

function filtrarItens() {
  const termo = inputPesquisa.value.toLowerCase();
  document.querySelectorAll(".lista div").forEach((item) => {
    const texto = item.firstChild.textContent.toLowerCase();
    item.style.display = texto.startsWith(termo) ? "flex" : "none";
  });
}

// Ativar eventos
BotaoAdd.addEventListener("click", adicionarItem);
inputPesquisa.addEventListener("input", filtrarItens);

//Carregar os itens ao iniciar a página
carregarItens();
