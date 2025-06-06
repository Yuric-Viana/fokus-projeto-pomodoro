const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const modalAria = document.querySelector('form');
const ulTarefas = document.querySelector('.app__section-task-list');
const cancelarNovaTarefa = document.querySelector('.app__form-footer__button--cancel');
const tarefaEmAndamento = document.querySelector('.app__section-active-task-description');
const limparTodasAsTarefas = document.getElementById('btn-remover-todas');

const btnRemoverConcluida = document.getElementById('btn-remover-concluidas');
const btnRemoverTodas = document.getElementById('btn-remover-todas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefa() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const itemTarefa = document.createElement('li');
    itemTarefa.classList.add('app__section-task-list-item');
    

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app_section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.style = 'margin-left: auto'

    botao.onclick = (event) => {
        event.stopPropagation();
        let novaDescricao;

        do {
            novaDescricao = prompt('Qual o novo nome da tarefa?');

            if(novaDescricao == null) {
                return;
            }

            novaDescricao = novaDescricao.trim();

            if(novaDescricao == '') {
                alert ('Um novo nome deve ser criado.');
            }
        } while (novaDescricao == '');

        paragrafo.textContent = novaDescricao;
        tarefa.descricao = novaDescricao;
        atualizarTarefa();
    }

    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', '/imagens/localStorage/edit.png');
    botao.append(imgBotao);

    itemTarefa.append(svg);
    itemTarefa.append(paragrafo);
    itemTarefa.append(botao);

    if(tarefa.completa) {
        itemTarefa.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        itemTarefa.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active');
                });
            if(tarefaSelecionada == tarefa) {
                tarefaEmAndamento.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = itemTarefa;
            tarefaEmAndamento.textContent = tarefa.descricao;
            itemTarefa.classList.add('app__section-task-list-item-active')
        }
    }
    

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
    
    atualizarTarefa();

    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');

})

textArea.addEventListener('keypress', (e) => { 
        if(e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formAdicionarTarefa.requestSubmit();
        }
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

cancelarNovaTarefa.addEventListener('click', () => {
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');    
})

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefa();
    }
})


const removeTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefa();
}

btnRemoverConcluida.onclick = () => removeTarefas(true);
btnRemoverTodas.onclick = () => removeTarefas(false);

