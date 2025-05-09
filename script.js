const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const pausaPomodoro = document.querySelector('.app__card-primary-button-wrapper');
const cardTemporizador = document.querySelector('#timer');
const tituloPage = document.querySelector('.app__title');
const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgPausarOuIniciarBt = document.querySelector('.app__card-primary-butto-icon');

const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const TEMPO_INICIAL = 5;

const startPauseBt = document.getElementById('start-pause')
let tempoCorridoEmSegundos = 5;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
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

const somTempoFinalizado = new Audio('/sons/beep.mp3'); 
somTempoFinalizado.volume = 0.1;
somTempoFinalizado.currentTime = 0.2;
const somTempoIniciado = new Audio('/sons/play.wav');
somTempoIniciado.volume = 0.3;
const somTempoPausado = new Audio('/sons/pause.mp3');
somTempoPausado.volume = 0.3;

const contagemRegressiva = () => {
    if(tempoCorridoEmSegundos <= 0) {
        somTempoFinalizado.play();
        zerar();
        tempoCorridoEmSegundos = TEMPO_INICIAL;
        iniciarOuPausarBt.innerHTML = 'Começar'
        return;
    }
    tempoCorridoEmSegundos -= 1;
    console.log(tempoCorridoEmSegundos);
}

startPauseBt.addEventListener('click', inciarTempoOuPausar);

function inciarTempoOuPausar() {
    if(intervaloId) {
        zerar();
        somTempoPausado.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.innerHTML = 'Pausar'
    imgPausarOuIniciarBt.src = '/imagens/pause.png'
    somTempoIniciado.play();

}

function zerar() {
    clearInterval(intervaloId);
    imgPausarOuIniciarBt.src = '/imagens/play_arrow.png'
    intervaloId = null;
}
