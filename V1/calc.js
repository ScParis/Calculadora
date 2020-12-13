var valor;
var resultado;

function botao(num){
    valor = document.calc.visor.value += num;
}

function deleta(){
    document.calc.visor.value = '';
}

function calcula(){
    resultado = eval(valor);
    document.calc.visor.value = resultado.toLocaleString('pt-BR');
}

function apaga(){
    
}