const controle = document.querySelectorAll("[data-controle]");
const estatisticas = document.querySelectorAll("[data-estatistica]");
const cores = ["AZUL", "BRANCO", "PRETO", "ROSA", "VERMELHO", "AMARELO"];
const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos":{
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas":{
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes":{
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

controle.forEach((elemento) => {
    elemento.addEventListener("click", (evento) =>{
        if (evento.target.dataset.peca != "cor") {
            manipuladorDeDados(evento.target.dataset.controle, evento.target.parentNode);
            atualizaEstatisticas(evento.target.dataset.peca, evento.target.dataset.controle,);
        } else {
            const operacao = evento.target.dataset.controle;
            const corAtual = evento.target.parentNode.querySelector("[data-nome-cor]").value;
            const indexAtual = cores.indexOf(corAtual);
            
            alterarCor(operacao, corAtual, indexAtual);
        }
    })
})

function manipuladorDeDados(operacao, controle){
    const peca = controle.querySelector("[data-contador]");

    if (operacao === "-") {
        peca.value = parseInt(peca.value) -1;
    } else {
        peca.value = parseInt(peca.value) +1;
    }
} 

function atualizaEstatisticas(peca){
     estatisticas.forEach( (elemento) => {
        elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica];
    })
}

function alterarCor(operacao, corAtual, indexCorAtual) {
    const listSize = cores.length-1;

    mudarDirecaoDireita(operacao, indexCorAtual, corAtual, listSize);
    mudarDirecaoEsquerda(operacao, indexCorAtual, corAtual, listSize);
}

mudarDirecaoDireita = (direcao, index, cor, listSize) => {
    if (direcao === ">") {
        if (index >= listSize) {
            index = 0;
            cor = cores[index]
            alterarImagem(cor);
            return;
        }

        index += 1;
        cor = cores[index];
        alterarImagem(cor);
    }
}

mudarDirecaoEsquerda = (direcao, index, cor, listSize) => {
    if (direcao === "<") {
        if (index == 0) {
            index = listSize;
            cor = cores[index]
            alterarImagem(cor);
            return;
        }

        index -= 1;
        cor = cores[index];
        alterarImagem(cor);
    }
}

alterarImagem = (corAtual) => {
    var imagem = `img/Robotron 2000 - ${corAtual}.png`;
    document.getElementById("robotron").setAttribute('src', imagem);
    document.getElementById("nome-cor").setAttribute("value", corAtual);
}
