let listaDeNumerosSorteados = [];
let quantidadeDePossibilidades = 10;

function definirTexto(tag, texto){
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.6; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    definirTexto("h1", "Jogo do Número Secreto");
    definirTexto("p", "Adivinhe o número secreto entre 1 e 10");
}

exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * quantidadeDePossibilidades) + 1;

    if (listaDeNumerosSorteados.length == quantidadeDePossibilidades){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
let palavraTentativas;

function verificarChute() {

    let chute = document.querySelector("input").value;
    tentativas++;

    if (chute == numeroSecreto) {

        palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";

        definirTexto("h1", "Acertou!");
        definirTexto("p", "Você adivinhou o  número secreto em " + tentativas + " " + palavraTentativas + ".");

        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numeroSecreto){
            definirTexto("h1", "Errou! Tente novamente.");
            definirTexto("p", "Dica: o número secreto é menor que o chute.");
        } else {
            definirTexto("h1", "Errou! Tente novamente.");
            definirTexto("p", "Dica: o número secreto é maior que o chute.");
        }
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciar(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    limparCampo();

    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}