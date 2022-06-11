let order = [];
let clickedOrder = [];
let score = 0;
let record = localStorage.getItem('record');

/* Ordem das cores
0 - verde 
1 - vermelho 
2 - amarelo 
3 - azul
*/

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const playButton = document.getElementById('play');

//sons do jogo
const audio = [
    new Audio('assets/1.mp3'), 
    new Audio('assets/2.mp3'),
    new Audio('assets/3.mp3'),
    new Audio('assets/4.mp3')];
const audioError = new Audio('assets/error.mp3');

//cria ordem aleatoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }
}

//acende a próxima cor
let lightColor = (elementColor, number, color) => {
    number = number * 600;
    setTimeout(() => {
        audio[color].play();
        elementColor.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        elementColor.classList.remove('selected');
    }, number + 200);
}


//checa se as cores clicadas são as mesmas da ordem do jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] !== order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {       
        ponto.innerHTML = score;
        
        nexteLevel();
    }
}

//função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    audio[color].play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);   
}

//funcão que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    }else if(color == 1) {
        return red;
    }else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//função para próximo nível
let nexteLevel = () => {
    score++;
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    audioError.play();
    alert('Você perdeu o jogo!\nClique em ok para iniciar um novo jogo');
    order = [];
    clickedOrder = [];        
    ponto.innerHTML = '--';
    playGame();    
}
              

//função para iniciar o jogo
let playGame = () => {
    alert('Bem vindo ao Jogo Genius, Iniciando novo jogo!');
    score = 0;
    nexteLevel();
   
}

//atualiza o Recorde
let updateRecord = () => {
    if(score > record) localStorage.setItem('record', score);
    document.getElementById('record').innerHTML = (record) ? record : 0;
}

//eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
playButton.addEventListener('click', playGame);


updateRecord();
