const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const pausaPomodoro = document.querySelector('.app__card-primary-button-wrapper');
const cardTemporizador = document.querySelector('#timer');
const tituloPage = document.querySelector('.app__title');
const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const duranteFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

pausaPomodoro.addEventListener('click', () => {

})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            tituloPage.innerHTML = 
            `Otimize sua produtividade,
           <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            tituloPage.innerHTML = 
            `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
            
        case 'descanso-longo':
            tituloPage.innerHTML = 
            `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>.`
            break;
    
        default:
            break;
    }
}

