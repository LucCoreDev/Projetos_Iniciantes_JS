// Peganod os elementos
const inputTitulo = document.getElementById("titulo");
const inputAno = document.getElementById("ano");
const list = document.getElementById("list");
const botaoAdicionar = document.getElementById("adicionar");
const InputImagem = document.getElementById("img");

// Para carregar os itens
document.addEventListener("DOMContentLoaded", carregarItens);

function adicionarItem() {
  const titulo = inputTitulo.value.trim();
  const ano = inputAno.value.trim();
  const imagem = InputImagem.files[0];

  if (titulo === "" || ano === "" || !imagem) {
    alert("Preencha todos os campos");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(imagem);
  reader.onload = function (){
    const item = {titulo, ano, imagem: reader.result};
    salvarNoLocal(item);
    criarItemNaLista(item);
  }


  inputTitulo.value = "";
  inputAno.value = "";
  InputImagem.value = "";
}

function salvarNoLocal(item) {
  const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
  catalogo.push(item);
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

function carregarItens() {
  const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
  list.innerHTML = "";

  catalogo.forEach(criarItemNaLista);
}

function criarItemNaLista(item) {

  const card = document.createElement("div");
  card.style.padding = "10px";
  card.style.backgroundColor = "#e9edc9";
  card.style.border = "black solid 2px";
  card.style.height = "200px";
  card.style.width = "200px";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.alignItems = "center";
  card.style.justifyContent = "center";
  card.style.position = "relative";
  card.style.overflow = "hidden";

  const imagem = document.createElement("img");
  imagem.src = item.imagem;
  imagem.style.width = "200px";
  imagem.style.height = "140px";
  imagem.style.objectFit = "cover";

  const texto = document.createElement("p");
  texto.textContent = `${item.titulo} (${item.ano})`;
  texto.style.margin = "10px 0 0";
  texto.style.fontWeight = "bold";
  texto.style.textAlign = "center";

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";
  botaoRemover.style.border = "none";
  botaoRemover.style.backgroundColor = "red";
  botaoRemover.style.color = "white";
  botaoRemover.style.borderRadius = "5px";
  botaoRemover.style.position = "absolute";
  botaoRemover.style.top = "5px";
  botaoRemover.style.right = "5px";
  botaoRemover.style.cursor = "pointer";

  botaoRemover.onclick = function () {
    list.removeChild(card);
    removeDoLocal(item.titulo);
  };

  card.appendChild(imagem);
  card.appendChild(texto);
  card.appendChild(botaoRemover);
  list.appendChild(card);
}

function removeDoLocal(titulo) {
  let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
  catalogo = catalogo.filter((item) => item.titulo !== titulo);
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

botaoAdicionar.addEventListener("click", adicionarItem);
