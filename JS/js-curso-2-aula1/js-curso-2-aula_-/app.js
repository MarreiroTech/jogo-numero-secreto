//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 100';

let nSorteados = [];
let nLimite = 10;
let nSecreto = gerarNum();
let nTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}


function exibirMensagemInicial() {
exibirTextoNaTela('h1','Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let nEscolhido = document.querySelector('input').value;
    
    if (nEscolhido == nSecreto) {
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = nTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensTentativas = `Você descobriu o número secreto com ${nTentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (nEscolhido > nSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        } else {
            exibirTextoNaTela('p','O número secreto é maior');
        }
        //nTentativas = nTentativas = 1;
        nTentativas++;
        limparCampo();
    }
}

function gerarNum() {
    let numeroEscolhido = parseInt(Math.random() * nLimite + 1);
    let qtdNumNaLista = nSorteados.length;

    if (qtdNumNaLista == nLimite) {
        nSorteados = [];
    }

    if (nSorteados.includes(numeroEscolhido)){
        return gerarNum();
    } else {
        nSorteados.push(numeroEscolhido);
        console.log(nSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    nEscolhido = document.querySelector('input');
    nEscolhido.value = '';
}

function reiniciarJogo() {
    nSecreto = gerarNum();
    limparCampo();
    nTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}