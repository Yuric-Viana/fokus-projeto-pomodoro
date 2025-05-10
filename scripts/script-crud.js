const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const modalAria = document.querySelector('form');
const ulTarefas = document.querySelector('.app__section-task-list');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarElementoTarefa(tarefa) {
    const itemTarefa = document.createElement('li');
    itemTarefa.classList.add('app_section-task-list-item');
    itemTarefa.style = 'display: flex; align-items: center; background-color: #808080; color: #01080E; padding: 1.5em; gap: 1em; border-radius: 10px; margin-bottom: 1em;';

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app_section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app_section-task-list-item-description');
    paragrafo.style = 'font-size: 18px; font-weight: 600; font-family: var(--font-family);'
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.style = 'margin-left: auto'
    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', '/imagens/localStorage/edit.png');
    botao.append(imgBotao);

    itemTarefa.append(svg);
    itemTarefa.append(paragrafo);
    itemTarefa.append(botao);

    return itemTarefa;

}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
    modalAria.setAttribute('aria-hidden', 'false');
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tarefa = {
        descricao: textArea.value
    }

    tarefas.push(tarefa);
    const criarItemTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(criarItemTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    criarElementoTarefa(tarefa);

    
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});