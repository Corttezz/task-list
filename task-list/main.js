const inputTarefa = document.querySelector('.tarefatext') // barra de texto
const btnTarefa = document.querySelector('.btn') // botao
const tarefas = document.querySelector('.tarefas') // ul

inputTarefa.addEventListener('keypress', function (e){
  if (e.keyCode === 13) {
    criarTarefa(inputTarefa.value);
    limpaInput()
  }
})

function limpaInput() {
  inputTarefa.value = ''
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerHTML += '            ';
  const botaoApagar = document.createElement('button')
  botaoApagar.innerHTML = 'Apagar'
  botaoApagar.setAttribute('class', 'apagar')
  li.appendChild(botaoApagar)
}

function criaLi() {
  const li = document.createElement('li')
  return li
}
function criarTarefa(inputTarefa) {
  const li = criaLi()
  li.innerHTML = inputTarefa
  tarefas.appendChild(li);
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function (e) {
  criarTarefa(inputTarefa.value)
})

document.addEventListener('click', function (e) {
  const el = e.target
  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
})

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criarTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
